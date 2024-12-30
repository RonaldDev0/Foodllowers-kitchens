'use client'
import { DeliveryForm } from './DeliveryForm'
import { useData } from '@/store'
import { useState } from 'react'
import { DeliverysPending } from './DeliverysPending'

export default function GetDeliveryPage () {
  const { user } = useData()
  const [pendingDeliveryAssignmentOrders, setPendingDeliveryAssignmentOrders] = useState<any>([])

  if (user === null || user.id !== 'cbeb57ee-e13b-4e51-9c0c-51f0b0c48c63') return null

  return (
    <div>
      <div className='w-full flex justify-center items-center my-8'>
        <p className='font-bold text-3xl'>
          Pide tu domiciliario
        </p>
      </div>
      <DeliveryForm
        pendingDeliveryAssignmentOrders={pendingDeliveryAssignmentOrders}
        setPendingDeliveryAssignmentOrders={setPendingDeliveryAssignmentOrders}
      />
      <DeliverysPending pendingDeliveryAssignmentOrders={pendingDeliveryAssignmentOrders} />
    </div>
  )
}
