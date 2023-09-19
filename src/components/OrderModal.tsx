/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react'
import Image from 'next/image'
import { useData } from '@/store'
import { useEffect } from 'react'
import { Howl } from 'howler'

export function OrderModal () {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const { order } = useData()
  const sound = new Howl({ src: ['../../notification.mp3'] })

  useEffect(() => {
    if (order) {
      sound.play()
      onOpen()
    }
  }, [order])

  return (
    <>
      {order && (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {onClose => (
              <>
                <ModalHeader className='flex flex-col gap-1'>{}</ModalHeader>
                <ModalBody>
                  <Image src='./img/img.webp' width='400' height='400' alt='img' className='rounded-xl' />
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
