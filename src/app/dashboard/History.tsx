'use client'
import { useEffect } from 'react'
import { useData } from '@/store'
import { useSupabase } from '../providers'
import { HistoryCard } from './HistoryCard'

export function History () {
  const { kitchenId, balanceHistory, balanceFetched, setStore } = useData()
  const { supabase } = useSupabase()

  useEffect(() => {
    if (!kitchenId || balanceFetched) {
      return
    }

    supabase
      .from('transactions')
      .select('*')
      .eq('kitchen_id', kitchenId)
      .order('created_at', { ascending: false })
      .range(0, 10)
      .then(({ data, error }) => {
        if (error) return

        setStore('balanceHistory', data)
        setStore('balanceFetched', true)
      })
  }, [kitchenId])

  return (
    <div className='w-96 flex flex-col gap-2'>
      <p>Detalle de ganancia por dia</p>
      <div className='max-h-[70vh] overflow-auto'>
        {balanceHistory.map(item => (
          <HistoryCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}
