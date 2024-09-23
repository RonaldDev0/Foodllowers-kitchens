'use client'
import { useData } from '@/store'
import { Switch } from '@nextui-org/react'
import { useSupabase } from '@/app/providers'
import { useEffect } from 'react'

export function SwitchState () {
  const { supabase } = useSupabase()
  const { user, active, currentOrder, orders, pendingDeliveryAssignmentOrders, setStore } = useData()

  const setKitchenState = () => {
    if (currentOrder || orders?.length) {
      alert('no puedes cambiar el estado de la cocina mientras estás cocinando')
      return
    }

    if (pendingDeliveryAssignmentOrders?.length) {
      alert('no puedes cambiar el estado de la cocina mientras hay pedidos pendientes')
      return
    }

    supabase
      .from('kitchens')
      .update({ open: !active })
      .eq('user_id', user.id)
      .select('open')
      .then(({ data, error }) => {
        if (error || !data) return
        setStore('active', data[0]?.open)
      })
  }

  useEffect(() => {
    if (!user) return
    supabase
      .from('kitchens')
      .select('open')
      .eq('user_id', user.id)
      .then(({ data, error }) => {
        if (error || !data) return
        setStore('active', data[0]?.open)
      })
  }, [user])

  return (
    <div className='w-full flex justify-center gap-44'>
      <p className='w-36'>
        {active ? 'estas conectado' : 'no estas conectado'}
      </p>
      <Switch
        color='secondary'
        isSelected={!!active}
        onClick={setKitchenState}
      />
    </div>
  )
}
