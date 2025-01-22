'use client'
import { AddressCard, type IAddress } from './Card'
import { useData } from '@/store'

export function AddressLIst () {
  const { kitchenAddress } = useData()

  if (kitchenAddress === null || !kitchenAddress.length) {
    return <div>No addresses</div>
  }

  return (
    <div className='flex flex-col gap-3'>
      {kitchenAddress.map((item: IAddress) => (
        <AddressCard
          key={item.key}
          address={item}
        />
      ))}
    </div>
  )
}
