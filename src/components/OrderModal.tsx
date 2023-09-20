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
      <Button onClick={() => setStore('order', { product: { price: 30000, description: 'La mejor hamburguesa de la ciudad', name: 'Hamburguesa' } })} color='primary'>Get order</Button>
      {order && (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {onClose => (
              <>
                <ModalHeader className='flex flex-col gap-1'>
                  <p>Tiempo restante: {counter} segundos</p>
                  <Progress color={(counter * 5) > 50 ? 'primary' : (counter * 5) > 20 ? 'warning' : 'danger'} aria-label='Loading...' value={counter * 5} className='max-w-md' />
                </ModalHeader>
                <ModalBody>
                  <img src='./img.avif' alt='img' className='rounded-xl w-[400px] h-[300px]' />
                  <p>{order.product.name}</p>
                  <p className='text-green-600'>${order.product.price.toLocaleString()}</p>
                  <p className='text-gray-400'>{order.product.description}</p>
                </ModalBody>
                <ModalFooter className='w-full justify-around'>
                  <Button onClick={() => setStore('order', null)} onPress={onClose} color='danger' variant='flat'>Cancelar orden</Button>
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
