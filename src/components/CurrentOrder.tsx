'use client'
import { useData } from '@/store'
import { Card, CardHeader, CardBody, CardFooter, Button, Avatar } from '@nextui-org/react'
import Image from 'next/image'
import { useState } from 'react'

export function CurrentOrder () {
  const { currentOrder, kitchenAddress, setStore } = useData()
  const [isLoading, setIsLoading] = useState(false)

  const finishOrder = () => {
    if (!currentOrder) return

    setIsLoading(true)
    fetch('/api/search_delivery', {
      method: 'POST',
      body: JSON.stringify({ kitchenAddress: kitchenAddress.geometry.location, orderID: currentOrder.id })
    })
      .then(res => res.json())
      .then(({ error }) => {
        setIsLoading(false)
        if (error) return
        setStore('currentOrder', null)
      })
  }

  if (!currentOrder) return null

  return (
    <div className='[@media(min-width:1000px)]:w-[24vw] [@media(max-width:800px)]:w-96]'>
      <Card>
        <CardHeader className='pb-0'>
          Pedido en preparación:
        </CardHeader>
        <CardBody>
          <div className='flex gap-3 mb-2'>
            <p>Numero de factura:</p>
            <div className='flex justify-center items-center'>
              <p>{currentOrder.invoice_id.slice(0, 6)}-</p>
              <p className='font-bold text-lg'>{currentOrder.invoice_id.slice(6, 10)}</p>
            </div>
          </div>
          <Image
            src={currentOrder.product.preview}
            width='200'
            height='250'
            alt='preview'
            className='rounded-lg w-full'
          />
          <div className='flex flex-col justify-around w-full py-2 gap-2'>
            <div className='flex justify-around'>
              <p className='text-large'>{currentOrder.product.name}</p>
              <p className='opacity-80'>
                {
                  currentOrder.product.price.toLocaleString('es-Es', {
                    style: 'currency',
                    currency: 'COP',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                    useGrouping: true
                  })
                }
              </p>
            </div>
            <div className='flex justify-around'>
              <div className='flex gap-1 items-center'>
                <Avatar src={currentOrder.product.influencers.avatar} />
                <p className='opacity-80'>
                  {currentOrder.product.influencers.full_name}
                </p>
              </div>
              <div>
                {' '}
              </div>
            </div>
          </div>
        </CardBody>
        <CardFooter>
          <Button
            color='secondary'
            className='w-full'
            onPress={finishOrder}
            isDisabled={isLoading}
          >
            Terminar Pedido
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
