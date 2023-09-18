/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { OrderModal } from '@/components'

export default function Home () {
  const router = useRouter()

  useEffect(() => {
    setTimeout(() => router.push('/'), 200)
  }, [])

  return (
    <>
      <OrderModal />
    </>
  )
}
