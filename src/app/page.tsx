'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Home () {
  const router = useRouter()

  useEffect(() => {
    setTimeout(() => {
      router.push('/')
    }, 200)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <h1>Helo world!</h1>
  )
}
