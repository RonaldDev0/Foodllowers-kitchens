'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useData } from '@/store'

export default function Home () {
  const router = useRouter()
  const { orders } = useData()

  useEffect(() => {
    setTimeout(() => {
      router.push('/')
    }, 200)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    console.log(orders)
  }, [orders])

  return (
    <p>{orders.JSON()}</p>
  )
}
