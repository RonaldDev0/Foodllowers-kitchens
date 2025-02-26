'use client'

import { useData } from '@/store'
import { useState, useEffect } from 'react'
import { Card, CardBody, Button, Avatar, Chip, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@nextui-org/react'
import { useSupabase } from '@/app/providers'
import Image from 'next/image'

export function Orders () {
  const { supabase } = useSupabase()
  const { orders, setStore, deleteOrder } = useData()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const [alert, setAlert] = useState<string | null>(null)

  function acceptOrder (order: any) {
    supabase
      .from('orders')
      .update({ order_state: 'cocinando...' })
      .eq('id', order.id)
      .select()
      .then(({ data }) => {
        if (data?.length) {
          deleteOrder(data[0].id)
          setStore('currentOrders', data)
        }
      })
  }

  useEffect(() => {
    if (alert) {
      onOpen()
    }
  }, [alert])

  if (!orders) {
    return
  }

  return (
    <>
      <div>
        <p className='font-semibold mb-2 text-large'>
          Pendientes: {orders.length}
        </p>
        <div className='flex flex-wrap gap-4 [@media(min-width:800px)]:max-w-[62vw] [@media(max-width:800px)]:w-80 overflow-auto'>
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
                      <p className='opacity-80'>
                        {
                          order.transaction_amount.kitchen.toLocaleString('es-Es', {
                            style: 'currency',
                            currency: 'COP',
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                            useGrouping: true
                          })
                        }
                      </p>
                    </div>
                    <div className='ml-3'>
                      <p>x{order.preferences.length}</p>
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
