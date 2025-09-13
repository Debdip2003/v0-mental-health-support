"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, CheckCircle, Brain, Heart, Shield } from "lucide-react";

// Questions and options will be fetched from Python backend

export function AssessmentTests() {
  const [selectedTest, setSelectedTest] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);
  const [assessmentResult, setAssessmentResult] = useState<{
    score: number;
    advice: string;
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [questions, setQuestions] = useState<string[]>([]);
  const [options, setOptions] = useState<{ value: number; label: string }[]>(
    []
  );
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);

  const getTestData = () => {
    switch (selectedTest) {
      case "phq9":
        return {
          questions: questions,
          options: options,
          title: "Depression Assessment (PHQ-9)",
        };
      case "gad7":
        return {
          questions: questions,
          options: options,
          title: "Anxiety Assessment (GAD-7)",
        };
      case "ghq":
        return {
          questions: questions,
          options: options,
          title: "General Health Assessment (GHQ)",
        };
      default:
        return { questions: [], options: [], title: "" };
    }
  };

  const fetchQuestionsAndOptions = async (testType: string) => {
    setIsLoadingQuestions(true);
    try {
      let apiUrl = "";
      if (testType === "phq9") {
        apiUrl = "http://127.0.0.1:5000/phq9";
      } else if (testType === "gad7") {
        apiUrl = "http://127.0.0.1:5000/gad7";
      } else if (testType === "ghq") {
        apiUrl = "http://127.0.0.1:5000/ghq";
      }

      console.log("Fetching from:", apiUrl);
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "text/html",
        },
        mode: "cors",
      });

      console.log("Response status:", response.status);
      console.log("Response headers:", response.headers);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch questions: ${response.status} ${response.statusText}`
        );
      }

      const html = await response.text();
      // Parse the HTML to extract questions and options
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");

      // Extract questions from labels
      const questionLabels = doc.querySelectorAll("label");
      const extractedQuestions: string[] = [];
      questionLabels.forEach((label) => {
        const text = label.textContent?.trim();
        if (
          text &&
          !text.includes("Not at all") &&
          !text.includes("Several days") &&
          !text.includes("More than half") &&
          !text.includes("Nearly every day") &&
          !text.includes("Better than usual") &&
          !text.includes("Same as usual") &&
          !text.includes("Less than usual") &&
          !text.includes("Much less than usual")
        ) {
          extractedQuestions.push(text);
        }
      });

      // Extract options from select elements
      const selectElement = doc.querySelector("select");
      const extractedOptions: { value: number; label: string }[] = [];
      if (selectElement) {
        const optionElements = selectElement.querySelectorAll("option");
        optionElements.forEach((option) => {
          const value = parseInt(option.getAttribute("value") || "0");
          const label = option.textContent?.trim() || "";
          if (label) {
            extractedOptions.push({ value, label });
          }
        });
      }

      setQuestions(extractedQuestions);
      setOptions(extractedOptions);
    } catch (error) {
      console.error("Error fetching questions:", error);
      // Show more specific error message
      alert(
        `Error loading assessment: ${
          error instanceof Error ? error.message : "Unknown error"
        }. Please make sure the Python backend is running on port 5000.`
      );
      setQuestions([]);
      setOptions([]);
    } finally {
      setIsLoadingQuestions(false);
    }
  };

  const handleResponse = (value: number) => {
    const newResponses = [...responses];
    newResponses[currentQuestion] = value;
    setResponses(newResponses);
  };

  const nextQuestion = async () => {
    const testData = getTestData();
    if (currentQuestion < testData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsSubmitting(true);
      try {
        const result = await submitAssessment();
        setAssessmentResult(result);
        setTestCompleted(true);
        setShowResults(true);
      } catch (error) {
        console.error("Error submitting assessment:", error);
        // Fallback to local calculation
        const score = calculateScore();
        setAssessmentResult({
          score,
          advice: getScoreInterpretation(score).description,
        });
        setTestCompleted(true);
        setShowResults(true);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const calculateScore = () => {
    return responses.reduce((sum, response) => sum + response, 0);
  };

  const submitAssessment = async () => {
    const score = calculateScore();

    try {
      let apiUrl = "";
      if (selectedTest === "phq9") {
        apiUrl = "http://127.0.0.1:5000/phq9";
      } else if (selectedTest === "gad7") {
        apiUrl = "http://127.0.0.1:5000/gad7";
      } else if (selectedTest === "ghq") {
        apiUrl = "http://127.0.0.1:5000/ghq";
      }

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ score }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit assessment");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error submitting assessment:", error);
      // Fallback to local calculation if backend is not available
      return {
        score,
        advice: getScoreInterpretation(score).description,
      };
    }
  };

  const getScoreInterpretation = (score: number) => {
    if (selectedTest === "phq9") {
      if (score <= 4)
        return {
          level: "Minimal",
          color: "text-green-600",
          description: "Minimal depression symptoms",
        };
      if (score <= 9)
        return {
          level: "Mild",
          color: "text-yellow-600",
          description: "Mild depression symptoms",
        };
      if (score <= 14)
        return {
          level: "Moderate",
          color: "text-orange-600",
          description: "Moderate depression symptoms",
        };
      if (score <= 19)
        return {
          level: "Moderately Severe",
          color: "text-red-600",
          description: "Moderately severe depression symptoms",
        };
      return {
        level: "Severe",
        color: "text-red-800",
        description: "Severe depression symptoms",
      };
    } else if (selectedTest === "gad7") {
      if (score <= 4)
        return {
          level: "Minimal",
          color: "text-green-600",
          description: "Minimal anxiety symptoms",
        };
      if (score <= 9)
        return {
          level: "Mild",
          color: "text-yellow-600",
          description: "Mild anxiety symptoms",
        };
      if (score <= 14)
        return {
          level: "Moderate",
          color: "text-orange-600",
          description: "Moderate anxiety symptoms",
        };
      return {
        level: "Severe",
        color: "text-red-600",
        description: "Severe anxiety symptoms",
      };
    } else {
      if (score <= 15)
        return {
          level: "Good",
          color: "text-green-600",
          description: "Good general mental health",
        };
      if (score <= 20)
        return {
          level: "Mild",
          color: "text-yellow-600",
          description: "Mild concerns",
        };
      return {
        level: "Significant",
        color: "text-red-600",
        description: "Significant mental health concerns",
      };
    }
  };

  const resetTest = () => {
    setSelectedTest(null);
    setCurrentQuestion(0);
    setResponses([]);
    setShowResults(false);
    setTestCompleted(false);
    setAssessmentResult(null);
    setIsSubmitting(false);
    setQuestions([]);
    setOptions([]);
    setIsLoadingQuestions(false);
  };

  const handleTestSelection = async (testType: string) => {
    setSelectedTest(testType);
    await fetchQuestionsAndOptions(testType);
  };

  const testData = getTestData();
  const progress =
    testData.questions.length > 0
      ? ((currentQuestion + 1) / testData.questions.length) * 100
      : 0;

  if (!selectedTest) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-slate-800">
            Mental Health Assessment Tools
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Take standardized assessments to better understand your mental
            health. These tools are for screening purposes only and should not
            replace professional consultation.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card
            className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-amber-500"
            onClick={() => handleTestSelection("phq9")}
          >
            <CardHeader className="text-center">
              <Brain className="w-12 h-12 text-amber-600 mx-auto mb-2" />
              <CardDescription>Depression Assessment</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 mb-4">
                This is a validated tool for screening and measuring depression
                severity.
              </p>
              <Button className="w-full bg-amber-600 hover:bg-amber-700">
                Start Assessment
              </Button>
            </CardContent>
          </Card>

          <Card
            className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-blue-500"
            onClick={() => handleTestSelection("gad7")}
          >
            <CardHeader className="text-center">
              <Heart className="w-12 h-12 text-blue-600 mx-auto mb-2" />
              <CardDescription>Anxiety Assessment</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 mb-4">
                This is a reliable tool for screening and measuring anxiety
                symptoms.
              </p>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Start Assessment
              </Button>
            </CardContent>
          </Card>

          <Card
            className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-emerald-500"
            onClick={() => handleTestSelection("ghq")}
          >
            <CardHeader className="text-center">
              <Shield className="w-12 h-12 text-emerald-600 mx-auto mb-2" />
              <CardDescription>General Health Assessment</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 mb-4">
                It assesses overall psychological well-being and mental health.
              </p>
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                Start Assessment
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-amber-50 border-amber-200">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-6 h-6 text-amber-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-amber-800 mb-2">
                  Important Disclaimer
                </h3>
                <p className="text-amber-700 text-sm">
                  These assessments are screening tools only and do not
                  constitute a diagnosis. If you're experiencing mental health
                  concerns, please consult with a qualified healthcare
                  professional. If you're having thoughts of self-harm, please
                  seek immediate help or contact emergency services.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showResults) {
    const score = assessmentResult?.score || calculateScore();
    const interpretation = getScoreInterpretation(score);
    const advice = assessmentResult?.advice || interpretation.description;

    return (
      <div className="max-w-2xl mx-auto p-6 space-y-6">
        <Card>
          <CardHeader className="text-center">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <CardTitle className="text-2xl text-slate-800">
              {testData.title} Results
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-slate-800 mb-2">
                {score}
              </div>
              <div
                className={`text-xl font-semibold ${interpretation.color} mb-2`}
              >
                {interpretation.level}
              </div>
              <p className="text-slate-600">{interpretation.description}</p>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-800 mb-2">
                Professional Assessment
              </h3>
              <p className="text-blue-700 text-sm">{advice}</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg">
              <h3 className="font-semibold text-slate-800 mb-2">Next Steps</h3>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• Share these results with a healthcare professional</li>
                <li>
                  • Consider booking a counseling session through our platform
                </li>
                <li>• Explore our resource hub for coping strategies</li>
                <li>• Connect with peers in our support community</li>
              </ul>
            </div>

            <div className="flex space-x-4">
              <Button
                onClick={resetTest}
                variant="outline"
                className="flex-1 bg-transparent"
              >
                Take Another Test
              </Button>
              <Button className="flex-1 bg-amber-600 hover:bg-amber-700">
                Book Counseling
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoadingQuestions) {
    return (
      <div className="max-w-2xl mx-auto p-6 space-y-6">
        <Card>
          <CardContent className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
            <h3 className="text-lg font-medium text-slate-800 mb-2">
              Loading Assessment
            </h3>
            <p className="text-slate-600">
              Fetching questions from the assessment server...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="max-w-2xl mx-auto p-6 space-y-6">
        <Card>
          <CardContent className="p-8 text-center">
            <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-800 mb-2">
              Unable to Load Assessment
            </h3>
            <p className="text-slate-600 mb-4">
              Could not fetch questions from the assessment server. Please make
              sure the Python backend is running.
            </p>
            <Button onClick={resetTest} variant="outline">
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl text-slate-800">
              {testData.title}
            </CardTitle>
            <Button variant="ghost" onClick={resetTest}>
              Exit
            </Button>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-slate-600">
              <span>
                Question {currentQuestion + 1} of {testData.questions.length}
              </span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-slate-800 mb-4">
              Over the last 2 weeks, how often have you been bothered by:
            </h3>
            <p className="text-slate-700 font-medium">
              {testData.questions[currentQuestion]}
            </p>
          </div>

          <RadioGroup
            value={responses[currentQuestion]?.toString()}
            onValueChange={(value) => handleResponse(Number.parseInt(value))}
          >
            {testData.options.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={option.value.toString()}
                  id={option.value.toString()}
                />
                <Label
                  htmlFor={option.value.toString()}
                  className="cursor-pointer"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>

          <Button
            onClick={nextQuestion}
            disabled={responses[currentQuestion] === undefined || isSubmitting}
            className="w-full bg-amber-600 hover:bg-amber-700"
          >
            {isSubmitting
              ? "Submitting..."
              : currentQuestion === testData.questions.length - 1
              ? "Complete Assessment"
              : "Next Question"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
