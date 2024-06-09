'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { Orders, CurrentOrder, ActivationCode, Setup, SwitchState } from '@/components'

export default function Home () {
  const loginCode = useSearchParams().get('code')
  const router = useRouter()

  useEffect(() => {
    if (!loginCode) return
    setTimeout(() => router.push('/'), 200)
  }, [])

  return (
    <main>
      <Setup />
      <SwitchState />
      <ActivationCode />
      <div className='flex [@media(max-width:800px)]:flex-col gap-16 mt-16'>
        <CurrentOrder />
        <Orders />
      </div>
    </main>
  )
}
