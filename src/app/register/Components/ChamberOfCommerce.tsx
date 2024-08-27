'use client'
import { useState } from 'react'
import { ImgItem } from '../ImgItem'
import { Button } from '@nextui-org/react'

export function ChamberOfCommerce ({ onClose }: { onClose: any }) {
  const [img, setImg] = useState<any>(null)
  const [error, setError] = useState<any>(null)

  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (!img) {
      setError('Ingresa la copia de tu documento de Cámara de Comercio')
      return
    }
    onClose()
  }

  return (
    <div className='flex flex-col gap-5'>
      <p>Para completar tu registro, necesitamos una copia del certificado de Cámara de Comercio de tu cocina. Este documento nos permite verificar la legalidad de tu negocio y asegurar que todo esté en orden. Asegúrate de que el documento esté actualizado y que la imagen sea clara y legible.</p>
      <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
        {error && (
          <p className='font-semibold text-red-500'>
            {error}
          </p>
        )}
        <ImgItem
          label='Certificado de Cámara de Comercio'
          value={img}
          setValue={setImg}
          bucketPath='chamber_of_commerce/'
          tablePath='chamber_of_commerce'
          nullTableValue={{ chamber_of_commerce: null }}
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
