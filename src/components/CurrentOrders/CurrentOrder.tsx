'use client'
import { useData } from '@/store'
import { Card, CardHeader, CardBody, CardFooter, Button, Avatar, useDisclosure, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Accordion, AccordionItem, Checkbox, Pagination, Chip } from '@nextui-org/react'
import Image from 'next/image'
import { useSupabase } from '@/app/providers'
import { X, Info } from 'lucide-react'
import { useState } from 'react'

export function CurrentOrder ({ currentOrder }: { currentOrder: any }) {
  const { currentOrders, pendingDeliveryAssignmentOrders, kitchenId, setStore } = useData()
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
        setStore('currentOrders', currentOrders?.filter(order => order.id !== currentOrder.id))
        if (!currentOrder.pickUpInStore) {
          setStore('pendingDeliveryAssignmentOrders', [...pendingDeliveryAssignmentOrders, currentOrder])
        }
      })

    supabase
      .from('earnings')
      .insert([
        { shipment_id: currentOrder.id, influencer_id: currentOrder.product.id_influencer, amount: currentOrder.transaction_amount.influencer, transaction_type: 'payment to influencer' },
        { shipment_id: currentOrder.id, kitchen_id: kitchenId, amount: currentOrder.transaction_amount.kitchen, transaction_type: 'payment to kitchen' }
      ])
      .then(({ error }) => {
        if (error) return

        supabase
          .from('kitchens')
          .select('balance')
          .eq('id', kitchenId)
          .single()
          .then(({ data, error }) => {
            if (error) return

            const newBalance = data.balance + currentOrder.transaction_amount.kitchen
            setStore('balance', newBalance)

            supabase
              .from('earnings')
              .select('*')
              .eq('kitchen_id', kitchenId)
              .order('created_at', { ascending: false })
              .range(0, 10)
              .then(({ data, error }) => {
                if (error) return

                setStore('balanceHistory', data)
              })

            supabase
              .from('kitchens')
              .update({ balance: newBalance })
              .eq('id', kitchenId)
              .then(() => {})
          })

        supabase
          .from('influencers')
          .select('balance')
          .eq('id', currentOrder.product.id_influencer)
          .single()
          .then(({ data, error }) => {
            if (error) return

            supabase
              .from('influencers')
              .update({ balance: data.balance + currentOrder.transaction_amount.influencer })
              .eq('id', currentOrder.product.id_influencer)
              .then(() => {})
          })
      })
  }

  if (!currentOrder) return null

  return (
    <>
      <Card>
        <CardHeader className='pb-0 flex flex-col items-start'>
          <div className='flex gap-3'>
            <p>Factura:</p>
            <div className='flex justify-center items-center'>
              <p>{currentOrder.invoice_id.slice(0, -3)}-</p>
              <p className='font-bold text-lg'>{currentOrder.invoice_id.slice(-3)}</p>
            </div>
          </div>
          <div className='flex gap-2'>
            <p>cantidad de hamburguesas:</p>
            <p className='text-purple-800 font-bold'>
              {currentOrder.preferences.length}
            </p>
          </div>
          {currentOrder.pickUpInStore && (
            <div>
              <p className='text-purple-800 font-bold'>
                lo reclama el cliente
              </p>
            </div>
          )}
        </CardHeader>
        <CardBody>
          {
            currentOrder.product.id === '471ba020-79b7-4204-9e9d-2e8ca2b0f216' && (
              <div className='mb-2 text-purple-800 flex items-center gap-2 cursor-pointer' onClick={onOpen}>
                <Info size={20} />
                <p>
                  Ingredientes
                </p>
              </div>
            )
          }
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
                  currentOrder.transaction_amount.kitchen.toLocaleString('es-Es', {
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
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className='flex justify-center'>
                <div className='flex gap-3'>
                  <p>Factura:</p>
                  <div className='flex justify-center items-center'>
                    <p>{currentOrder.invoice_id.slice(0, -3)}-</p>
                    <p className='font-bold text-lg'>{currentOrder.invoice_id.slice(-3)}</p>
                  </div>
                </div>
              </ModalHeader>
              <ModalBody>
                <div className='flex flex-col gap-6'>
                  <div className='flex gap-3 items-center text-sm'>
                    <Info size={40} />
                    <p>Estos son los ingredietes que el cliente ha seleccionado para su pedido:</p>
                  </div>
                  <div>
                    <Accordion>
                      {currentOrder.preferences[page]?.categories
                        .filter(({ category }: any) => !(category === 'Acompañantes' || category === 'Bebidas') || currentOrder.preferences[page].isCombo)
                        .map(({ category, items }: any) => (
                          <AccordionItem
                            key={category}
                            aria-label={category}
                            title={(
                              <div className='flex justify-between'>
                                <p>{category}</p>
                                {currentOrder.preferences[page].isCombo && (category === 'Bebidas' || category === 'Acompañantes') && (
                                  <Chip size='sm' color='primary'>
                                    combo
                                  </Chip>
                                )}
                              </div>
                            )}
                          >
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
                  {currentOrder.preferences.length > 1 &&
                    <div className='w-fll flex justify-center'>
                      <Pagination
                        page={page + 1}
                        onChange={e => setPage(e - 1)}
                        total={currentOrder.preferences.length}
                      />
                    </div>}
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
