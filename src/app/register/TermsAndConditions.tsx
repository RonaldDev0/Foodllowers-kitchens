'use client'
import { Checkbox, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@nextui-org/react'
import { ClipboardList } from 'lucide-react'

export function TermsAndConditions ({ termsAndConditions, setTermsAndConditions }: { termsAndConditions: boolean, setTermsAndConditions: Function }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <>
      <div className='flex justify-center items-center '>
        <Checkbox
          isSelected={termsAndConditions}
          onChange={({ target: { checked } }) => setTermsAndConditions(checked)}
          color='secondary'
        />
        <p onClick={onOpen} className='cursor-pointer hover:opacity-75 transition-all'>
          Términos y condiciones
        </p>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader>
                <div className='flex flex-col gap-3 justify-center items-center w-full'>
                  <ClipboardList size={30} />
                  <p className='font-semibold text-lg'>
                    Términos y Condiciones de Uso
                  </p>
                </div>
              </ModalHeader>
              <ModalBody>
                <div className='overflow-y-auto h-[75vh]'>
                  <b>1. Información General:</b> <br /><br />
                  Las cocinas ocultas aliadas deben aceptar y cumplir con estos términos y condiciones para poder operar a través de la plataforma de Foodllowers.  <br /><br />Foodllowers se reserva el derecho de modificar estos términos en cualquier momento. <br /><br />

                  <b>2. Responsabilidades:</b> <br /><br />
                  Las cocinas son responsables de la calidad y seguridad de los alimentos preparados. <br /><br /> Deben cumplir con todas las normativas de salud y seguridad alimentaria aplicables. <br /><br /> Cualquier incumplimiento puede resultar en la suspensión de la cuenta. <br /><br />

                  <b>3. Uso del Servicio:</b> <br /><br />
                  La app de Foodllowers para cocinas ocultas debe ser utilizada exclusivamente para gestionar pedidos y promociones asociadas a la plataforma. <br /><br /> Cualquier uso no autorizado puede llevar a la terminación del contrato con Foodllowers. <br /><br />

                  <b>4. Políticas de Pago:</b> <br /><br />
                  Foodllowers realizará pagos a las cocinas ocultas mensualmente, tras la verificación de todas las transacciones realizadas. <br /><br /> Las cocinas deben revisar los pedidos y reportar cualquier discrepancia en un plazo no mayor a 48 horas. <br /><br />

                  <b>5. Propiedad Intelectual:</b> <br /><br />
                  Las cocinas ocultas no pueden utilizar la marca de Foodllowers ni su contenido sin la autorización previa por escrito. <br /><br /> Todo uso no autorizado puede resultar en acciones legales. <br /><br />

                  <b>6. Privacidad:</b> <br /><br />
                  Las cocinas ocultas deben garantizar la confidencialidad de los datos de los usuarios obtenidos a través de la plataforma de Foodllowers. <br /><br /> No pueden compartir esta información con terceros sin el consentimiento expreso de Foodllowers. <br /><br />

                  <b>7. Comprobación Antifraude:</b> <br /><br />
                  Foodllowers se reserva el derecho de verificar cualquier transacción para evitar fraudes. <br /><br /> Las cocinas ocultas deben colaborar en caso de que se requiera una investigación más exhaustiva. <br /><br />
                </div>
              </ModalBody>
              <ModalFooter>
                {}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
