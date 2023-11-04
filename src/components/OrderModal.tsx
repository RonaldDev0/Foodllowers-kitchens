'use client'

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Progress } from '@nextui-org/react'
import { useData } from '@/store'
import { useEffect, useState } from 'react'
import { Howl } from 'howler'
import Image from 'next/image'

export function OrderModal () {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const { order, setStore } = useData()
  const sound = new Howl({ src: ['../../notification.mp3'] })
  const [counter, setCounter] = useState(0)

  const getOrder = () => {
    setStore('order', {
      product: {
        price: 30000,
        description: 'La mejor hamburguesa de la ciudad',
        name: 'Hamburguesa'
      }
    })
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
      <Button onClick={getOrder} color='primary'>
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
                    src='/img.avif'
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
                  <Button onPress={onClose} color='primary'>
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
