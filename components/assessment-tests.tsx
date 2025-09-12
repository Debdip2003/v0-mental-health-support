"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { AlertCircle, CheckCircle, Brain, Heart, Shield } from "lucide-react"

const PHQ9_QUESTIONS = [
  "Little interest or pleasure in doing things",
  "Feeling down, depressed, or hopeless",
  "Trouble falling or staying asleep, or sleeping too much",
  "Feeling tired or having little energy",
  "Poor appetite or overeating",
  "Feeling bad about yourself or that you are a failure or have let yourself or your family down",
  "Trouble concentrating on things, such as reading the newspaper or watching television",
  "Moving or speaking so slowly that other people could have noticed, or the opposite being so fidgety or restless that you have been moving around a lot more than usual",
  "Thoughts that you would be better off dead, or of hurting yourself",
]

const GAD7_QUESTIONS = [
  "Feeling nervous, anxious, or on edge",
  "Not being able to stop or control worrying",
  "Worrying too much about different things",
  "Trouble relaxing",
  "Being so restless that it is hard to sit still",
  "Becoming easily annoyed or irritable",
  "Feeling afraid, as if something awful might happen",
]

const GHQ_QUESTIONS = [
  "Been able to concentrate on whatever you're doing",
  "Lost much sleep over worry",
  "Felt that you were playing a useful part in things",
  "Felt capable of making decisions about things",
  "Felt constantly under strain",
  "Felt you couldn't overcome your difficulties",
  "Been able to enjoy your normal day-to-day activities",
  "Been able to face up to problems",
  "Been feeling unhappy or depressed",
  "Been losing confidence in yourself",
  "Been thinking of yourself as a worthless person",
  "Been feeling reasonably happy, all things considered",
]

const RESPONSE_OPTIONS = [
  { value: 0, label: "Not at all" },
  { value: 1, label: "Several days" },
  { value: 2, label: "More than half the days" },
  { value: 3, label: "Nearly every day" },
]

const GAD_OPTIONS = [
  { value: 0, label: "Not at all" },
  { value: 1, label: "Several days" },
  { value: 2, label: "More than half the days" },
  { value: 3, label: "Nearly every day" },
]

const GHQ_OPTIONS = [
  { value: 0, label: "Better than usual" },
  { value: 1, label: "Same as usual" },
  { value: 2, label: "Less than usual" },
  { value: 3, label: "Much less than usual" },
]

export function AssessmentTests() {
  const [selectedTest, setSelectedTest] = useState<string | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [responses, setResponses] = useState<number[]>([])
  const [showResults, setShowResults] = useState(false)
  const [testCompleted, setTestCompleted] = useState(false)

  const getTestData = () => {
    switch (selectedTest) {
      case "phq9":
        return { questions: PHQ9_QUESTIONS, options: RESPONSE_OPTIONS, title: "PHQ-9 Depression Assessment" }
      case "gad7":
        return { questions: GAD7_QUESTIONS, options: GAD_OPTIONS, title: "GAD-7 Anxiety Assessment" }
      case "ghq":
        return { questions: GHQ_QUESTIONS, options: GHQ_OPTIONS, title: "GHQ General Health Assessment" }
      default:
        return { questions: [], options: [], title: "" }
    }
  }

  const handleResponse = (value: number) => {
    const newResponses = [...responses]
    newResponses[currentQuestion] = value
    setResponses(newResponses)
  }

  const nextQuestion = () => {
    const testData = getTestData()
    if (currentQuestion < testData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setTestCompleted(true)
      setShowResults(true)
    }
  }

  const calculateScore = () => {
    return responses.reduce((sum, response) => sum + response, 0)
  }

  const getScoreInterpretation = (score: number) => {
    if (selectedTest === "phq9") {
      if (score <= 4) return { level: "Minimal", color: "text-green-600", description: "Minimal depression symptoms" }
      if (score <= 9) return { level: "Mild", color: "text-yellow-600", description: "Mild depression symptoms" }
      if (score <= 14)
        return { level: "Moderate", color: "text-orange-600", description: "Moderate depression symptoms" }
      if (score <= 19)
        return {
          level: "Moderately Severe",
          color: "text-red-600",
          description: "Moderately severe depression symptoms",
        }
      return { level: "Severe", color: "text-red-800", description: "Severe depression symptoms" }
    } else if (selectedTest === "gad7") {
      if (score <= 4) return { level: "Minimal", color: "text-green-600", description: "Minimal anxiety symptoms" }
      if (score <= 9) return { level: "Mild", color: "text-yellow-600", description: "Mild anxiety symptoms" }
      if (score <= 14) return { level: "Moderate", color: "text-orange-600", description: "Moderate anxiety symptoms" }
      return { level: "Severe", color: "text-red-600", description: "Severe anxiety symptoms" }
    } else {
      if (score <= 15) return { level: "Good", color: "text-green-600", description: "Good general mental health" }
      if (score <= 20) return { level: "Mild", color: "text-yellow-600", description: "Mild concerns" }
      return { level: "Significant", color: "text-red-600", description: "Significant mental health concerns" }
    }
  }

  const resetTest = () => {
    setSelectedTest(null)
    setCurrentQuestion(0)
    setResponses([])
    setShowResults(false)
    setTestCompleted(false)
  }

  const testData = getTestData()
  const progress = testData.questions.length > 0 ? ((currentQuestion + 1) / testData.questions.length) * 100 : 0

  if (!selectedTest) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-slate-800">Mental Health Assessment Tools</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Take standardized assessments to better understand your mental health. These tools are for screening
            purposes only and should not replace professional consultation.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card
            className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-amber-500"
            onClick={() => setSelectedTest("phq9")}
          >
            <CardHeader className="text-center">
              <Brain className="w-12 h-12 text-amber-600 mx-auto mb-2" />
              <CardDescription>Depression Assessment</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 mb-4">
                Patient Health Questionnaire-9 is a validated tool for screening and measuring depression severity.
              </p>
              <Button className="w-full bg-amber-600 hover:bg-amber-700">Start Assessment</Button>
            </CardContent>
          </Card>

          <Card
            className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-blue-500"
            onClick={() => setSelectedTest("gad7")}
          >
            <CardHeader className="text-center">
              <Heart className="w-12 h-12 text-blue-600 mx-auto mb-2" />
              <CardDescription>Anxiety Assessment</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 mb-4">
                Generalized Anxiety Disorder-7 is a reliable tool for screening and measuring anxiety symptoms.
              </p>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">Start Assessment</Button>
            </CardContent>
          </Card>

          <Card
            className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-emerald-500"
            onClick={() => setSelectedTest("ghq")}
          >
            <CardHeader className="text-center">
              <Shield className="w-12 h-12 text-emerald-600 mx-auto mb-2" />
              <CardDescription>General Health Assessment</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 mb-4">
                General Health Questionnaire assesses overall psychological well-being and mental health.
              </p>
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Start Assessment</Button>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-amber-50 border-amber-200">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-6 h-6 text-amber-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-amber-800 mb-2">Important Disclaimer</h3>
                <p className="text-amber-700 text-sm">
                  These assessments are screening tools only and do not constitute a diagnosis. If you're experiencing
                  mental health concerns, please consult with a qualified healthcare professional. If you're having
                  thoughts of self-harm, please seek immediate help or contact emergency services.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (showResults) {
    const score = calculateScore()
    const interpretation = getScoreInterpretation(score)

    return (
      <div className="max-w-2xl mx-auto p-6 space-y-6">
        <Card>
          <CardHeader className="text-center">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <CardTitle className="text-2xl text-slate-800">{testData.title} Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-slate-800 mb-2">{score}</div>
              <div className={`text-xl font-semibold ${interpretation.color} mb-2`}>{interpretation.level}</div>
              <p className="text-slate-600">{interpretation.description}</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg">
              <h3 className="font-semibold text-slate-800 mb-2">Next Steps</h3>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• Share these results with a healthcare professional</li>
                <li>• Consider booking a counseling session through our platform</li>
                <li>• Explore our resource hub for coping strategies</li>
                <li>• Connect with peers in our support community</li>
              </ul>
            </div>

            <div className="flex space-x-4">
              <Button onClick={resetTest} variant="outline" className="flex-1 bg-transparent">
                Take Another Test
              </Button>
              <Button className="flex-1 bg-amber-600 hover:bg-amber-700">Book Counseling</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl text-slate-800">{testData.title}</CardTitle>
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
            <p className="text-slate-700 font-medium">{testData.questions[currentQuestion]}</p>
          </div>

          <RadioGroup
            value={responses[currentQuestion]?.toString()}
            onValueChange={(value) => handleResponse(Number.parseInt(value))}
          >
            {testData.options.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value.toString()} id={option.value.toString()} />
                <Label htmlFor={option.value.toString()} className="cursor-pointer">
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>

          <Button
            onClick={nextQuestion}
            disabled={responses[currentQuestion] === undefined}
            className="w-full bg-amber-600 hover:bg-amber-700"
          >
            {currentQuestion === testData.questions.length - 1 ? "Complete Assessment" : "Next Question"}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
