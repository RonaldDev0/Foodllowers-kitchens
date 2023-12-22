'use client'
import { useData } from '@/store'
import { useSupabase } from '../providers'
import { useEffect } from 'react'
import { Graphic } from './Graphic'

const getIntroOfPage = (label: any) => {
  switch (label) {
    case 'pizza':
      return 'Ronald es un man muy aspero'
    case 'hamburguesa':
      return 'Saenz es un sticker, no sabe nada de la vida'
    default:
      return ''
  }
}

export default function Dashboard () {
  const { supabase } = useSupabase()
  const { shipments, kitchenId, setStore } = useData()

  useEffect(() => {
    if (!shipments && kitchenId) {
      supabase
        .from('orders')
        .select('*')
        .eq('kitchen_id', kitchenId)
        .then(res => {
          if (res.data?.length) {
            setStore('shipments', res.data)
          }
        })
    }
  }, [kitchenId])

  if (!shipments || !kitchenId) {
    return null
  }

  return (
    <main>
      <Graphic
        data={shipments}
        bars={[{ value: 'price', dataKey: 'product.price', color: '#6b48ff' }]}
        XDataKey='product.name'
        getIntroOfPage={getIntroOfPage}
      />
    </main>
  )
}
