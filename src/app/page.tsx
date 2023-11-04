'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { OrderModal } from '@/components'
import { useData } from '@/store'
import { useSupabase } from './providers'

export default function Home () {
  const { supabase } = useSupabase()
  const loginCode = useSearchParams().get('code')
  const router = useRouter()
  const { user, setStore } = useData()

  useEffect(() => {
    if (loginCode) {
      setTimeout(() => router.push('/'), 200)
    }

    if (user) {
      supabase.channel('orders').on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'orders', filter: `kitchen_id=eq.${user.user.id}` },
        payload => {
          console.log(payload)
          setStore('order', payload.new)
        }
      ).subscribe()
    }
  }, [])

  return (
    <>
      <OrderModal />
    </>
  )
}
