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

  return (
    <>
      <Card className='w-full cursor-pointer h-14 my-2'>
        <CardBody onClick={onOpen} className='group hover:group-hover'>
          <div className='flex justify-between items-center'>
            <p>{new Date(item.created_at).toLocaleDateString('es-ES')}</p>
            <div className='flex gap-4'>
              <p>{item.amount.toLocaleString('es-Es', { style: 'currency', currency: 'COP' })}</p>
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
                <p>{new Date(item.created_at).toLocaleDateString('es-ES')}</p>
                <p>{item.amount.toLocaleString('es-Es', { style: 'currency', currency: 'COP' })}</p>
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
