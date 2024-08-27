'use client'
import { useState } from 'react'
import { Input, Button } from '@nextui-org/react'
import { z } from 'zod'

const numberSchema = z.string().refine(value => {
  const numberPattern = /^3\d{9}$/
  return numberPattern.test(value)
},
{
  message: 'Número invalido'
})

export function NumberForm ({ setStep, setNumber, number, createCode }: { setStep: Function, setNumber: Function, number: string, createCode: Function }) {
  const [error, setError] = useState<any>(null)

  const handleChange = (e: any) => {
    setNumber(e.target.value)
    setError(null)
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    try {
      setNumber(numberSchema.parse(number))
      createCode()
      setStep(1)
    } catch {
      setError('Número invalido')
    }
  }

  return (
    <div className='flex flex-col gap-5'>
      <p>Por favor, ingresa tu número de celular. Este dato es fundamental para completar el registro de tu cocina y facilitar cualquier comunicación necesaria. Asegúrate de que sea un número válido.</p>
      <form className='flex flex-col' onSubmit={handleSubmit}>
        <Input
          type='number'
          placeholder='Número de celular'
          startContent='+57 '
          value={number}
          onChange={handleChange}
          errorMessage={error}
          isInvalid={!!error}
        />
        <Button
          type='submit'
          color='secondary'
          className='text-lg font-semibold mt-4'
        >
          Siguiente
        </Button>
      </form>
    </div>
  )
}
