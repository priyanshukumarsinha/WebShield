'use client'

import { useEffect, useState } from 'react'
import { LoadingScreen } from '@/components/loading-screen'
import { DashboardSkeleton } from '@/components/dashboard-skeleton'

export default function Page() {
  const [isLoading, setIsLoading] = useState(true)
  const [isDataReady, setIsDataReady] = useState(false)

  useEffect(() => {
    // Simulate initial loading
    const loadingTimer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    // Simulate data fetching
    const dataTimer = setTimeout(() => {
      setIsDataReady(true)
    }, 5000)

    return () => {
      clearTimeout(loadingTimer)
      clearTimeout(dataTimer)
    }
  }, [])

  if (isLoading) {
    return <LoadingScreen />
  }

  if (!isDataReady) {
    return <DashboardSkeleton />
  }

  return (
    <div className="container mx-auto p-6">
      {/* Your actual dashboard content will go here */}
      <h1>Dashboard Content</h1>
    </div>
  )
}

