"use client"

import { AppWrapper } from "@/components/app-wrapper"
import { AssessmentTests } from "@/components/assessment-tests"

export default function AssessmentsPage() {
  return (
    <AppWrapper>
     

      <main className="container mx-auto px-4 py-8">
        <AssessmentTests />
      </main>
    </AppWrapper>
  )
}
