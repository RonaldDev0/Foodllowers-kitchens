'use client'
import { useSupabase } from '../providers'
import { useEffect } from 'react'
import { Card, CardHeader, CardBody } from '@nextui-org/react'
import { useData } from '@/store'
import { useRouter } from 'next/navigation'

export default function Validation () {
  const { supabase } = useSupabase()
  const { kitchen, setStore } = useData()
  const router = useRouter()

  const logout = () => {
    supabase.auth.signOut()
      .then(() => setStore('user', null))
  }

  useEffect(() => {
    if (!kitchen || !kitchen.register_complete) {
      return
    }

    router.push('/')
  }, [kitchen])

  return (
    <main className='fixed z-50 w-full h-screen top-0 left-0 flex flex-col justify-center gap-20 items-center backdrop-blur-md'>
      <Card>
        <CardHeader>
          <div className='w-full flex justify-center mt-4'>
            <p className='font-semibold text-lg'>
              Tus datos se estan validando
            </p>
          </div>
        </CardHeader>
        <CardBody>
          <div className='w-96 px-4 flex flex-col gap-5'>
            <p>¡Hola!</p>
            <p>Gracias por registrarte para trabajar como delivery en Foodllowers. Queremos informarte que hemos recibido tus datos y actualmente están siendo validados por nuestro equipo.</p>
            <p>Este proceso puede tomar algún tiempo, ya que queremos asegurarnos de que toda la información sea correcta y segura. Tu paciencia durante este tiempo es muy apreciada.</p>
            <p>Una vez que tus datos hayan sido validados, te enviaremos una notificación a través del correo electrónico que tienes registrado en Foodllowers. Por favor, asegúrate de revisar tu bandeja de entrada y la carpeta de spam.</p>
            <p>Agradecemos tu interés en trabajar con nosotros y esperamos poder darte la bienvenida a nuestro equipo de deliverys muy pronto.</p>
            <p>¡Gracias por tu paciencia y comprensión!</p>
            <p>Saludos, El equipo de Foodllowers</p>
          </div>
        </CardBody>
      </Card>
      <div className='w-96 flex justify-center'>
        <p className='text-purple-700 text-lg font-semibold cursor-pointer' onClick={logout}>
          Cerrar sesión
        </p>
      </div>
    </main>
  )
}
