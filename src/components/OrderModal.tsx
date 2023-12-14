'use client'

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Progress } from '@nextui-org/react'
import { useData } from '@/store'
import { useEffect, useState } from 'react'
import { Howl } from 'howler'
import Image from 'next/image'
import { useSupabase } from '@/app/providers'

export function OrderModal () {
  const { supabase } = useSupabase()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const { order, active, setStore } = useData()
  const sound = new Howl({ src: ['../../notification.mp3'] })
  const [counter, setCounter] = useState(0)

  const getOrder = () => {
    if (active) {
      setStore('order', {
        product: {
          price: 30000,
          description: 'La mejor hamburguesa de la ciudad',
          name: 'Hamburguesa'
        }
      })
      return
    }
    alert('No puedes recibir pedidos cuando estas desconectado!')
  }

  function acceptOrder (onClose: Function) {
    if (order) {
      supabase
        .from('orders')
        .update({ order_state: 'cocinando...' })
        .eq('id', order.id)
        .select()
        .then(res => {
          if (res.data) {
            onClose()
          }
        })
    }
  }

  useEffect(() => {
    if (order) {
      sound.play()
      onOpen()
      setCounter(60)
    }
  }, [order])

  useEffect(() => {
    if (counter > 0) {
      const timer = setTimeout(() => setCounter(counter - 1), 1000)
      return () => clearTimeout(timer)
    } else setStore('order', null)
  }, [counter])

  return (
    <>
      <Button onClick={getOrder} color='secondary'>
        Get order
      </Button>
      {order && (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {onClose => (
              <>
                <ModalHeader className='flex flex-col gap-1'>
                  <p>Tiempo restante: {counter} segundos</p>
                  <Progress
                    color={(counter / 6 * 10) > 50
                      ? 'primary'
                      : (counter / 6 * 20) > 30
                          ? 'warning'
                          : 'danger'}
                    aria-label='Loading...'
                    value={counter / 6 * 10}
                    className='max-w-md'
                  />
                </ModalHeader>
                <ModalBody>
                  <Image
                    src={!order.product.preview ? '/img.avif' : order.product.preview}
                    width='400'
                    height='300'
                    alt='img'
                    className='rounded-xl w-[400px] h-[300px]'
                  />
                  <p>{order.product.name}</p>
                  <p className='text-green-600'>
                    ${order.product.price.toLocaleString()}
                  </p>
                  <p className='text-gray-400'>
                    {order.product.description}
                  </p>
                </ModalBody>
                <ModalFooter className='w-full justify-around'>
                  <Button
                    onClick={() => setStore('order', null)}
                    onPress={onClose}
                    color='danger'
                    variant='flat'
                  >
                    Cancelar orden
                  </Button>
                  <Button
                    onPress={() => acceptOrder(onClose)}
                    color='primary'
                  >
                    Aceptar orden
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
    </>
  )
}
