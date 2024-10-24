'use client'
import { CurrentOrder } from './CurrentOrder'
import { useData } from '@/store'

export function CurrentOrders () {
  const { currentOrders } = useData()

  if (!currentOrders?.length) return null

  return (
    <div className='[@media(min-width:800px)]:max-w-[62vw] [@media(max-width:800px)]:w-80'>
      <p className='font-semibold mb-2 text-large'>
        Pedidos en preparación:
      </p>
      <div className='flex gap-4 justify-center'>
        {currentOrders?.map(order => (
          <CurrentOrder
            key={order.id}
            currentOrder={order}
          />
        ))}
      </div>
    </div>
  )
}
