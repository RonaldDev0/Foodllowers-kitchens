export function DeliverysPending ({ pendingDeliveryAssignmentOrders }: { pendingDeliveryAssignmentOrders: [] }) {
  return (
    <div className='w-full flex flex-col justify-center items-center my-8'>
      <div className='flex gap-1'>
        <p className='font-semibold'>Tienes</p>
        <p className='font-bold text-purple-600'>{pendingDeliveryAssignmentOrders.length}</p>
        <p className='font-semibold'>domiciliarios pendientes</p>
      </div>
    </div>
  )
}
