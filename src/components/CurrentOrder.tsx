'use client'
import { useData } from '@/store'
import { Card, CardHeader, CardBody, CardFooter, Button, Avatar } from '@nextui-org/react'
import Image from 'next/image'
import { useSupabase } from '@/app/providers'

export function CurrentOrder () {
  const { currentOrder, setStore } = useData()
  const { supabase } = useSupabase()

  const finishOrder = () => {
    if (currentOrder) {
      supabase
        .from('orders')
        .update({ order_state: 'buscando delivery...' })
        .eq('id', currentOrder.id)
        .select()
        .then(({ data }) => {
          if (data?.length) {
            setStore('currentOrder', null)
          }
        })
    }
  }

  if (!currentOrder) {
    return
  }

  return (
    <div className='[@media(min-width:1000px)]:w-[24vw] [@media(max-width:800px)]:w-96]'>
      <Card>
        <CardHeader className='pb-0'>
          Pedido en preparación:
        </CardHeader>
        <CardBody>
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
              <p className='text-green-600 text-large'>
                ${currentOrder.product.price.toLocaleString()}
              </p>
            </div>
            <div className='flex justify-around'>
              <div className='flex gap-1 items-center'>
                <Avatar src={currentOrder.product.influencers.preview} />
                <p className='opacity-80'>
                  {currentOrder.product.influencers.full_name}
                </p>
              </div>
              <div>
                {}
              </div>
            </div>
          </div>
        </CardBody>
        <CardFooter>
          <Button color='secondary' className='w-full' onPress={finishOrder}>
            Terminar Pedido
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
