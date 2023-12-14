'use client'
import Image from 'next/image'
import { Button, Card, CardHeader, CardBody, CardFooter, Divider, Input } from '@nextui-org/react'
import { useSupabase } from '../providers'
import { useRef } from 'react'
import Link from 'next/link'

export default function Login () {
  const { supabase } = useSupabase()
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
