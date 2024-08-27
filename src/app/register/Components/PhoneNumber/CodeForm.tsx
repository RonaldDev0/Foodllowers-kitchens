'use client'
import { useState } from 'react'
import { Input, Button } from '@nextui-org/react'
import { useSupabase } from '@/app/providers'
import { useData } from '@/store'

interface IProps {
  setStep: Function,
  code: any,
  onClose: Function
  number: string
}

export function CodeForm ({ setStep, code, onClose, number }: IProps) {
  const { supabase } = useSupabase()
  const { kitchenId, setStore } = useData()

  const [input, setInput] = useState('')
  const [error, setError] = useState<any>(null)

  const handleChange = (e: any) => {
    setInput(e.target.value)
    setError(null)
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()

    if (code !== input) {
      setError('Codigo incorrecto')
      return
    }

    supabase
      .from('kitchens')
      .update({ phone_number: number })
      .eq('id', kitchenId)
      .select('*')
      .then(({ error, data }) => {
        if (error) {
          if (error.message === 'duplicate key value violates unique constraint "deliverys_phone_number_key"') {
            setError('Ya existe un repartidor con ese número')
            return
          }
          return
        }

        setStore('kitchen', data[0])
        onClose && onClose()
      })
  }

  return (
    <div className='flex flex-col gap-5'>
      <p>Hemos enviado un código de verificación a tu número de celular. Por favor, ingrésalo a continuación para confirmar tu número y completar el proceso de registro.</p>
      <form className='flex flex-col' onSubmit={handleSubmit}>
        <Input
          type='number'
          placeholder='Código de verificación'
          value={input}
          onChange={handleChange}
          errorMessage={error}
          isInvalid={!!error}
        />
        <Button
          type='submit'
          color='secondary'
          className='text-lg font-semibold mt-4'
        >
          Guardar
        </Button>
      </form>
      <div className='w-full flex justify-center'>
        <p className='text-purple-700 font-semibold cursor-pointer' onClick={() => setStep(0)}>Cambiar el número</p>
      </div>
    </div>
  )
}
