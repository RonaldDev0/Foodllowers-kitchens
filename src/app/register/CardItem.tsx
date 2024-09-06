'use client'
import { useData } from '@/store'
import { cloneElement, useState, useEffect } from 'react'
import { Card, CardBody, Modal, ModalContent, ModalHeader, ModalBody, useDisclosure } from '@nextui-org/react'
import { ChevronRight, Check } from 'lucide-react'

import type { IStep } from './registerSteps'

export function CardItem ({ icon, title, component, tableReference }: IStep) {
  const { kitchen } = useData()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const [checked, setChecked] = useState(false)

  useEffect(() => {
    if (!kitchen) return

    if (tableReference === 'bank_account') {
      setChecked((
        !!kitchen?.bank_account?.accountType &&
        !!kitchen?.bank_account?.bank &&
        !!kitchen?.bank_account?.bankNumber &&
        !!kitchen?.bank_account?.ownerName &&
        !!kitchen?.bank_account?.ownerDocumentType &&
        !!kitchen?.bank_account?.ownerDocumentNumber
      ))
      return
    }

    setChecked(kitchen[tableReference])
  }, [kitchen])

  return (
    <>
      <div onClick={onOpen}>
        <Card className='relative group cursor-pointer w-96'>
          <CardBody>
            <div className='flex justify-between items-center relative'>
              <div className='flex items-center gap-5'>
                {icon}
                <p>{title}</p>
              </div>
              {checked && (
                <div className='absolute top-0 right-0 h-full opacity-100 group-hover:opacity-0 transition-opacity duration-200 flex items-center'>
                  <Check size={25} />
                </div>
              )}
              <div className='absolute top-0 right-0 h-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center'>
                <ChevronRight size={20} />
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className='flex justify-center'>
                <div className='flex flex-col items-center gap-3'>
                  {icon}
                  {title}
                </div>
              </ModalHeader>
              <ModalBody className='mb-5'>
                {cloneElement(component, { onClose })}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
