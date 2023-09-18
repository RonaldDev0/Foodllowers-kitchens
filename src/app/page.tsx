'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { OrderModal } from '@/components'

export default function Home () {
  const router = useRouter()

  useEffect(() => {
    setTimeout(() => router.push('/'), 200)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <OrderModal />
    </>
  )
}
