'use client'
import { useData } from '@/store'

export function DeliverysPending () {
  const { pendingDeliveryAssignmentOrders } = useData()
  return (
    <div className='w-full flex flex-col justify-center items-center my-8'>
      <div className='flex gap-1'>
        <p className='font-semibold'>Estamos buscando a</p>
        <p className='font-bold text-purple-600'>{pendingDeliveryAssignmentOrders.length}</p>
        <p className='font-semibold'>domiciliarios</p>
      </div>
      {/* <div className='flex gap-1'>
        <p className='font-semibold'>Tienes pendientes a</p>
        <p className='font-bold text-purple-600'>{pendingDeliveryAssignmentOrders.length}</p>
        <p className='font-semibold'>domiciliarios</p>
      </div> */}
    </div>
  )
}
