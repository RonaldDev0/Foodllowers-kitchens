'use client'
import { useData } from '@/store'
import { Card, CardHeader, CardBody, CardFooter, Button, Avatar, useDisclosure, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Accordion, AccordionItem, Checkbox, Pagination } from '@nextui-org/react'
import Image from 'next/image'
import { useSupabase } from '@/app/providers'
import { X, Info } from 'lucide-react'
import { useState } from 'react'

export function CurrentOrder () {
  const { currentOrder, pendingDeliveryAssignmentOrders, setStore } = useData()
  const { supabase } = useSupabase()

  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [page, setPage] = useState(0)

  const finishOrder = () => {
    if (!currentOrder) return

    supabase
      .from('orders')
      .update({ order_state: 'buscando delivery...' })
      .eq('id', currentOrder.id)
      .then(({ error }) => {
        if (error) return
        setStore('pendingDeliveryAssignmentOrders', [...pendingDeliveryAssignmentOrders, currentOrder])
        setStore('currentOrder', null)
      })
  }

  if (!currentOrder) return null

  return (
    <>
      <div className='[@media(min-width:1000px)]:w-[24vw] [@media(max-width:800px)]:w-96]'>
        <p className='font-semibold mb-2 text-large'>
          Pedido en preparación:
        </p>
        <Card>
          <CardHeader className='pb-0 flex flex-col gap-2 items-start'>
            <div className='flex gap-3'>
              <p>Numero de factura:</p>
              <div className='flex justify-center items-center'>
                <p>{currentOrder.invoice_id.slice(0, 6)}-</p>
                <p className='font-bold text-lg'>{currentOrder.invoice_id.slice(6, 10)}</p>
              </div>
            </div>
            <div className='flex gap-2'>
              <p>cantidad de hamburguesas:</p>
              <p className='text-purple-800 font-bold'>
                {currentOrder.preferences.length}
              </p>
            </div>
          </CardHeader>
          <CardBody>
            <div className='mb-2 text-purple-800 flex items-center gap-2 cursor-pointer' onClick={onOpen}>
              <Info size={20} />
              <p>
                Ingredientes
              </p>
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
            >
              Terminar Pedido
            </Button>
          </CardFooter>
        </Card>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className='flex justify-center'>
                ¡Tu Sorpresa Gastronómica!
              </ModalHeader>
              <ModalBody>
                <div className='flex flex-col gap-6'>
                  <div className='flex gap-3 items-center text-sm'>
                    <Info size={40} />
                    <p>Estos son los ingredietes que el cliente ha seleccionado para su pedido:</p>
                  </div>
                  <div>
                    <Accordion>
                      {currentOrder.preferences[page].map(({ category, items }: any) => (
                        <AccordionItem key={category} aria-label={category} title={category}>
                          <div className='flex flex-col'>
                            {items.map(({ name, checked }: any) => (
                              <Checkbox
                                key={name}
                                color='danger'
                                lineThrough
                                icon={<X size={20} />}
                                isSelected={checked}
                              >
                                {name}
                              </Checkbox>
                            ))}
                          </div>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                  <div className='w-fll flex justify-center'>
                    <Pagination
                      page={page + 1}
                      onChange={e => setPage(e - 1)}
                      total={currentOrder.preferences.length}
                    />
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  onPress={onClose}
                  color='secondary'
                  className='w-full text-lg '
                >
                  Cerrar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
