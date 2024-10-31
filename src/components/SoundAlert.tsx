'use client'
import { useEffect } from 'react'
import { useData } from '@/store'
import { Howl } from 'howler'
import { Toaster, toast } from 'sonner'
import { Button, useDisclosure, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/react'

export function SoundAlert () {
  const { soundAlert, darkMode, setStore } = useData()
  const sound = new Howl({ src: ['../../alert.mp3'] })

  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  useEffect(() => {
    if (!soundAlert) return
    toast.info('Tienes una nueva orden')
    sound.play()
    onOpen()
    setTimeout(() => sound.play(), 1000)
    const intervalId = setInterval(() => sound.play(), 1000)

    return () => clearInterval(intervalId)
  }, [soundAlert])

  return (
    <>
      <Toaster
        expand
        richColors
        theme={darkMode ? 'dark' : 'light'}
      />
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader>
                <p>Tienes una nueva orden!!</p>
              </ModalHeader>
              <ModalBody>
                <p>dale aceptar para quitar la alerta</p>
              </ModalBody>
              <ModalFooter>
                <Button
                  onPress={() => {
                    onClose()
                    setStore('soundAlert', false)
                  }}
                  color='secondary'
                  className='w-full text-lg '
                >
                  Aceptar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
