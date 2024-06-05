'use client'
import { Card, CardBody, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Button } from '@nextui-org/react'
import { ArrowRight } from 'lucide-react'

export interface Item {
  id: string
  created_at: string
  amount: number
}

export function HistoryCard ({ item }: { item: Item }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const date = new Date(item.created_at)
    .toLocaleDateString('es-ES', {
      month: 'long',
      year: 'numeric',
      day: 'numeric'
    })

  const amount = item.amount
    .toLocaleString('es-Es', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      useGrouping: true
    })

  return (
    <>
      <Card className='w-full cursor-pointer h-14 my-2'>
        <CardBody onClick={onOpen} className='group hover:group-hover'>
          <div className='flex justify-between items-center'>
            <p>{date}</p>
            <div className='flex gap-4'>
              <p>{amount}</p>
              <ArrowRight size={28} className='opacity-0 group-hover:opacity-100 transition-all' />
            </div>
          </div>
        </CardBody>
      </Card>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className=''>
                Detalles de las ganancias
              </ModalHeader>
              <ModalBody>
                <p>{date}</p>
                <p>{amount}</p>
              </ModalBody>
              <ModalFooter>
                <Button color='secondary' onPress={onClose}>
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
