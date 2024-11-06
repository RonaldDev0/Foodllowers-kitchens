'use client'
import { useEffect } from 'react'
import { useData } from '@/store'
import { useSupabase } from '../providers'
import { AlertCircle } from 'lucide-react'

export function Balance () {
  const { kitchenId, balance, balanceFetched, setStore } = useData()
  const { supabase } = useSupabase()

  useEffect(() => {
    if (!kitchenId || balanceFetched) {
      return
    }

    supabase
      .from('kitchens')
      .select('balance')
      .eq('id', kitchenId)
      .single()
      .then(({ data, error }) => {
        if (error) {
          return
        }
        setStore('balance', data.balance)
        setStore('balanceFetched', true)
      })
  }, [kitchenId])

  return (
    <div className='flex flex-col items-center'>
      <p className='font-semibold text-xl'>Balance</p>
      <p className='font-bold text-3xl'>
        {
          balance.toLocaleString('es-Es', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
            useGrouping: true
          })
        }
      </p>
      <div className='flex justify-center items-center gap-2 mt-10 w-72'>
        <AlertCircle size={40} color='red' />
        <p>El dinero acumulado se transfiere automáticamente cada martes.</p>
      </div>
    </div>
  )
}
