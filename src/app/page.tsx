'use client'
import { useSupabase } from './providers'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { Switch } from '@nextui-org/react'
import { OrderModal, Orders } from '@/components'
import { useData } from '@/store'

export default function Home () {
  const { user, active, setStore } = useData()
  const { supabase } = useSupabase()
  const loginCode = useSearchParams().get('code')
  const router = useRouter()

  const setKitchenState = () => {
    supabase
      .from('kitchens')
      .update({ open: !active })
      .eq('user_id', user.id)
      .select()
      .then(res => {
        if (res.data) {
          setStore('active', !active)
        }
      })
  }

  useEffect(() => {
    if (loginCode) {
      setTimeout(() => router.push('/'), 200)
    }
  }, [])

  useEffect(() => {
    if (user) {
      supabase
        .from('kitchens')
        .select()
        .eq('user_id', user.id)
        .then(res => {
          if (res.data) {
            setStore('active', res.data[0]?.open)
          }
        })
    }
  }, [user])

  return (
    <main>
      <nav className='flex justify-between'>
        <h1>{active ? 'estas conectado' : 'no estas conectado'}</h1>
        <Switch color='secondary' isSelected={!!active} onClick={setKitchenState} />
      </nav>
      <OrderModal />
      <Orders />
    </main>
  )
}
