/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Progress } from '@nextui-org/react'
import { useData } from '@/store'
import { useEffect, useState } from 'react'
import { Howl } from 'howler'

export function OrderModal () {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const { order, setStore } = useData()
  const sound = new Howl({ src: ['../../notification.mp3'] })
  const [counter, setCounter] = useState(20)

  useEffect(() => {
    if (order) {
      sound.play()
      onOpen()
      setCounter(20)
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
      <Button onClick={() => setStore('order', { product: { price: 30000, description: 'La mejor hamburguesa de la ciudad', productName: 'Hamburguesa' } })} color='primary'>Get order</Button>
      {order && (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {onClose => (
              <>
                <ModalHeader className='flex flex-col gap-1'>
                  <p>Tiempo restante: {counter} segundos</p>
                  <Progress aria-label='Loading...' value={counter * 5} className='max-w-md' />
                </ModalHeader>
                <ModalBody>
                  <img src='./img.avif' alt='img' className='rounded-xl w-[400px] h-[350px]' />
                  <p>{order.product.productName}</p>
                  <p className='text-green-600'>${order.product.price.toLocaleString()}</p>
                  <p>{order.product.description}</p>
                </ModalBody>
                <ModalFooter>
                  <Button onPress={onClose} color='danger' variant='light'>Cancelar orden</Button>
                  <Button onPress={onClose} color='primary'>Aceptar orden</Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
    </>
  )
}
