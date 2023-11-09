'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function Home () {
  const loginCode = useSearchParams().get('code')
  const router = useRouter()

  useEffect(() => {
    if (loginCode) {
      setTimeout(() => router.push('/'), 200)
    }
  }, [])

  return (
    <main>
      <h1>status: on</h1>
    </main>
  )
}
