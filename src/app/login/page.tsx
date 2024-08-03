'use client'
import Image from 'next/image'
import { Button, Card, CardHeader, CardBody, CardFooter, Divider, Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@nextui-org/react'
import { useSupabase } from '../providers'
import { useRef } from 'react'
import Link from 'next/link'
import { ClipboardList } from 'lucide-react'

export default function Login () {
  const { supabase } = useSupabase()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const email = useRef<any>()
  const password = useRef<any>()

  const Login = async () => await supabase
    .auth
    .signInWithOAuth(
      {
        provider: 'google'
      }
    )

  return (
    <main className='h-screen flex justify-center items-center'>
      <Card className='p-10 [@media(max-width:800px)]:p-2'>
        <CardHeader className='justify-center text-2xl'>
          Iniciar sesión
        </CardHeader>
        <CardBody className='justify-center items-center flex flex-col gap-6'>
          <Input
            ref={email}
            isRequired
            type='email'
            label='Email'
            className='max-w-xs'
          />
          <Input
            ref={password}
            isRequired
            type='password'
            label='Password'
            className='max-w-xs'
          />
          <Button className='w-full' color='secondary'>
            Ingresar
          </Button>
          <p className='text-purple-500 cursor-pointer' onClick={onOpen}>
            Terminos y Condiciones de Uso
          </p>
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
                      <b>INFORMACIÓN RELEVANTE</b><br /><br />
                      Es requisito necesario para la adquisición de los productos que se ofrecen en este sitio, que lea y acepte los siguientes Términos y Condiciones que a continuación se redactan. El uso de nuestros servicios así como la compra de nuestros productos implica que usted ha leído y aceptado los Términos y Condiciones de Uso en el presente documento. Todos los productos  que son ofrecidos por nuestro sitio web pudieran ser creados, cobrados, enviados o presentados por una página web tercera y en tal caso estarían sujetas a sus propios Términos y Condiciones. En algunos casos, para adquirir un producto, será necesario el registro por parte del usuario, con ingreso de datos personales fidedignos y definición de una contraseña.<br /><br />
                      El usuario puede elegir y cambiar la clave para su acceso de administración de la cuenta en cualquier momento, en caso de que se haya registrado y que sea necesario para la compra de alguno de nuestros productos. foodllowers.vercel.app no asume la responsabilidad en caso de que entregue dicha clave a terceros.<br /><br />
                      Todas las compras y transacciones que se lleven a cabo por medio de este sitio web, están sujetas a un proceso de confirmación y verificación, el cual podría incluir la verificación del stock y disponibilidad de producto, validación de la forma de pago, validación de la factura (en caso de existir) y el cumplimiento de las condiciones requeridas por el medio de pago seleccionado. En algunos casos puede que se requiera una verificación por medio de correo electrónico.<br /><br />
                      Los precios de los productos ofrecidos en este marketplace son válidos solamente en las compras realizadas en este sitio web.<br /><br />
                      <b>LICENCIA</b><br /><br />
                      Conglonet  a través de su sitio web concede una licencia para que los usuarios utilicen  los productos que son vendidos en este sitio web de acuerdo a los Términos y Condiciones que se describen en este documento.<br /><br />
                      <b>USO NO AUTORIZADO</b><br /><br />
                      En caso de que aplique (para venta de software, templetes, u otro producto de diseño y programación) usted no puede colocar uno de nuestros productos, modificado o sin modificar, en un CD, sitio web o ningún otro medio y ofrecerlos para la redistribución o la reventa de ningún tipo.<br /><br />
                      <b>PROPIEDAD</b><br /><br />
                      Usted no puede declarar propiedad intelectual o exclusiva a ninguno de nuestros productos, modificado o sin modificar. Todos los productos son propiedad  de los proveedores del contenido. En caso de que no se especifique lo contrario, nuestros productos se proporcionan  sin ningún tipo de garantía, expresa o implícita. En ningún caso esta compañía será  responsable de ningún daño incluyendo, pero no limitado a, daños directos, indirectos, especiales, fortuitos o consecuentes u otras pérdidas resultantes del uso o de la imposibilidad de utilizar nuestros productos.<br /><br />
                      <b>POLÍTICA DE REEMBOLSO Y GARANTÍA</b><br /><br />
                      En el caso de productos que sean  mercancías irrevocables no-tangibles, no realizamos reembolsos después de que se envíe el producto, usted tiene la responsabilidad de entender antes de comprarlo.  Le pedimos que lea cuidadosamente antes de comprarlo. Hacemos solamente excepciones con esta regla cuando la descripción no se ajusta al producto. Hay algunos productos que pudieran tener garantía y posibilidad de reembolso pero este será especificado al comprar el producto. En tales casos la garantía solo cubrirá fallas de fábrica y sólo se hará efectiva cuando el producto se haya usado correctamente. La garantía no cubre averías o daños ocasionados por uso indebido. Los términos de la garantía están asociados a fallas de fabricación y funcionamiento en condiciones normales de los productos y sólo se harán efectivos estos términos si el equipo ha sido usado correctamente. Esto incluye:<br /><br />
                      – De acuerdo a las especificaciones técnicas indicadas para cada producto.<br /><br />
                      – En condiciones ambientales acorde con las especificaciones indicadas por el fabricante.<br /><br />
                      – En uso específico para la función con que fue diseñado de fábrica.<br /><br />
                      – En condiciones de operación eléctrica acorde con las especificaciones y tolerancias indicadas.<br /><br />
                      <b>COMPROBACIÓN ANTIFRAUDE</b><br /><br />
                      La compra del cliente puede ser aplazada para la comprobación antifraude. También puede ser suspendida por más tiempo para una investigación más rigurosa, para evitar transacciones fraudulentas.<br /><br />
                      <b>PRIVACIDAD</b><br /><br />
                      Este foodllowers.vercel.app garantiza que la información personal que usted envía cuenta con la seguridad necesaria. Los datos ingresados por usuario o en el caso de requerir una validación de los pedidos no serán entregados a terceros, salvo que deba ser revelada en cumplimiento a una orden judicial o requerimientos legales.<br /><br />
                      La suscripción a boletines de correos electrónicos publicitarios es voluntaria y podría ser seleccionada al momento de crear su cuenta.<br /><br />
                      Conglonet reserva los derechos de cambiar o de modificar estos términos sin previo aviso.
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    {}
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
          <Link href='/register' className='text-purple-500'>
            No tienes una cuenta?
          </Link>
        </CardBody>
        <CardFooter className='flex flex-col justify-center'>
          <Divider className='mb-8' />
          <Button
            color='primary'
            onPress={Login}
            className='flex justify-center items-center gap-2 w-80 py-6 text-lg'
          >
            <Image
              src='./icons/google.svg'
              alt='Google'
              width='45'
              height='45'
            />
            <p>
              Inicar sesión con Google
            </p>
          </Button>
        </CardFooter>
      </Card>
    </main>
  )
}
