"use client"

import { AppWrapper } from "@/components/app-wrapper"
import { AppointmentBooking } from "@/components/appointment-booking"
import { useAuth } from "@/contexts/auth-context"

export default function AppointmentsPage() {
  const { user } = useAuth()

  return (
    <AppWrapper>
    

      <main className="container mx-auto px-4 py-8">
        <AppointmentBooking user={user!} />
      </main>
    </AppWrapper>
  )
}
