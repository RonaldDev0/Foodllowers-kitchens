'use client'
import { useState, useEffect } from 'react'
import { useData } from '@/store'
import { useSupabase } from '../providers'

export function Balance () {
  const { deliveryId } = useData()
  const { supabase } = useSupabase()

  const [balance, setBalance] = useState<number>(0)

  useEffect(() => {
    if (!deliveryId) {
      return
    }

    supabase
      .from('deliverys')
      .select('balance')
      .eq('id', deliveryId)
      .single()
      .then(({ data, error }) => {
        if (error) {
          return
        }
        setBalance(data.balance)
      })
  }, [deliveryId])

  return (
    <div className='flex flex-col items-center'>
      <p className='font-semibold text-xl'>Balance</p>
      <p className='font-bold text-3xl'>
        {balance.toLocaleString('es-Es', { style: 'currency', currency: 'COP' })}
      </p>
    </div>
  )
}
