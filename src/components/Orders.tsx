'use client'

import { useData } from '@/store'
import { useState, useEffect } from 'react'
import { Card, CardBody, Button, Avatar, Chip, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@nextui-org/react'
import { useSupabase } from '@/app/providers'
// import { Howl } from 'howler'
import Image from 'next/image'

export function Orders () {
  const { supabase } = useSupabase()
  const { orders, kitchenId, setStore, deleteOrder } = useData()
  // const sound = new Howl({ src: ['../../notification.mp3'] })
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const [alert, setAlert] = useState<string | null>(null)

  function acceptOrder (order: any) {
    supabase
      .from('orders')
      .select('id')
      .eq('kitchen_id', kitchenId)
      .eq('order_state', 'cocinando...')
      .then(({ data }) => {
        if (!data?.length) {
          supabase
            .from('orders')
            .update({ order_state: 'cocinando...' })
            .eq('id', order.id)
            .select()
            .then(({ data }) => {
              if (data?.length) {
                deleteOrder(data[0].id)
                setStore('currentOrder', data[0])
              }
            })
          return
        }
        setAlert('No puedes preparar mas de 1 orden a la vez')
      })
  }

  useEffect(() => {
    if (alert) {
      onOpen()
    }
  }, [alert])

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
    <>
      <div>
        <p className='font-semibold mb-2 text-large'>
          Pendientes: {orders.length}
        </p>
        <div className='
          [@media(min-width:800px)]:grid
          [@media(min-width:800px)]:grid-cols-2
          [@media(max-width:800px)]:flex
          [@media(max-width:800px)]:flex-col
          gap-4 max-h-[70vh] overflow-auto'
        >
          {orders.map((order, index) => (
            <Card key={order.id} className='w-96 h-min'>
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
                      <Avatar src={order.product.influencers.avatar} />
                      <p className='opacity-80'>
                        {order.product.influencers.full_name}
                      </p>
                    </div>
                    <Button color='primary' onPress={() => acceptOrder(order)}>
                      preparar pedido
                    </Button>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader>
                <p>Error</p>
              </ModalHeader>
              <ModalBody>
                <p>{alert}</p>
              </ModalBody>
              <ModalFooter>
                <Button
                  color='secondary'
                  onPress={() => {
                    onClose()
                    setAlert(null)
                  }}
                >
                  Aceptar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
