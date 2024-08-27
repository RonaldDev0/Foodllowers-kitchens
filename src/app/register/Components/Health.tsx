'use client'
import { useState } from 'react'
import { ImgItem } from '../ImgItem'
import { Button } from '@nextui-org/react'

export function Health ({ onClose }: { onClose: any }) {
  const [img, setImg] = useState<any>(null)
  const [error, setError] = useState<any>(null)

  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (!img) {
      setError('Ingresa la copia de tu documento de Sanidad')
      return
    }
    onClose()
  }

  return (
    <div className='flex flex-col gap-5'>
      <p>Para garantizar la calidad y seguridad de los alimentos, necesitamos que subas una copia del certificado de sanidad de tu cocina. Este documento es crucial para confirmar que tu cocina cumple con las normativas sanitarias vigentes. Asegúrate de que la imagen del certificado sea clara y que esté vigente.</p>
      <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
        {error && (
          <p className='font-semibold text-red-500'>
            {error}
          </p>
        )}
        <ImgItem
          label='Documento de Sanidad'
          value={img}
          setValue={setImg}
          bucketPath='health/'
          tablePath='health'
          nullTableValue={{ health: null }}
        />
        <Button
          type='submit'
          color='secondary'
          className='text-lg font-semibold mt-4'
        >
          Guardar
        </Button>
      </form>
    </div>
  )
}
