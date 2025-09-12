"use client"

import { AppWrapper } from "@/components/app-wrapper"
import { PeerSupport } from "@/components/peer-support"

export default function PeerSupportPage() {
  return (
    <AppWrapper>
     

      <main className="container mx-auto px-4 py-8">
        <PeerSupport />
      </main>
    </AppWrapper>
  )
}
