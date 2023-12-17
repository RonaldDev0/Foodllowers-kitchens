'use client'

import { useData } from '@/store'
// import { useEffect } from 'react'
import { Card, CardBody, Button, Avatar, Chip } from '@nextui-org/react'
import { useSupabase } from '@/app/providers'
// import { Howl } from 'howler'
import Image from 'next/image'

export function Orders () {
  const { supabase } = useSupabase()
  const { orders } = useData()
  // const sound = new Howl({ src: ['../../notification.mp3'] })

  function acceptOrder (order: any) {
    supabase
      .from('orders')
      .update({ order_state: 'cocinando...' })
      .eq('id', order.id)
      .select()
  }

  // useEffect(() => {
  //   // if (orders) {
  //   //   sound.play()
  //   // }

  //   console.log(orders)
  // }, [orders])

  if (orders === null) {
    return
  }

  return (
    <div className='flex flex-col gap-4'>
      {orders.map((order, index) => (
        <Card key={order.id}>
          <CardBody className='p-0'>
            <div className='flex'>
              <Image
                src={order.product.preview}
                width='200'
                height='250'
                alt='preview'
                className='rounded-lg h-36'
              />
              <Chip color='primary' className='absolute m-1'>
                #{index + 1}
              </Chip>
              <div className='flex flex-col justify-around w-full px-2'>
                <div className='flex justify-around'>
                  <p>{order.product.name}</p>
                  <p className='text-green-600'>
                    ${order.product.price.toLocaleString()}
                  </p>
                </div>
                <div className='flex gap-1 items-center'>
                  <Avatar src={order.product.influencers.preview} />
                  <p className='opacity-80'>
                    {order.product.influencers.full_name}
                  </p>
                </div>
                <Button color='secondary' onPress={() => acceptOrder(order)}>
                  preparar pedido
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  )
}
