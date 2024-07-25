'use client'
import { useState } from 'react'
import Image from 'next/image'
import { Plus, XCircle } from 'lucide-react'

interface Props {
  value: any
  setValue: Function
}

export function ImgItem ({ value, setValue }: Props) {
  const [inputElement, setInputElement] = useState<any>(null)

  const handleClick = () => {
    if (inputElement) {
      inputElement.click()
    }
  }

  const handleFileChange = (e: any) => {
    const file = e.target.files[0]
    if (file) {
      setValue(file)
    }
  }

  return (
    <div className={`${!value && 'border'} rounded-xl h-56 flex justify-center items-center bg-neutral-800 overflow-hidden relative`}>
      {value
        ? (
          <div className='relative w-full h-full'>
            <Image
              src={URL.createObjectURL(value)}
              alt='img'
              layout='fill'
              objectFit='cover'
              className='rounded-xl'
            />
            <XCircle
              color='black'
              size={25}
              className='absolute top-2 right-2 cursor-pointer'
              onClick={() => setValue(null)}
            />
          </div>
          )
        : (
          <div
            className='flex flex-col justify-center items-center w-full h-full cursor-pointer'
            onClick={handleClick}
          >
            <p className='text-xl'>
              imagen de producto
            </p>
            <div className='opacity-50 flex flex-col items-center'>
              <Plus size={28} />
              <p>Agrega una imagen</p>
            </div>
          </div>
          )}
      <input
        className='opacity-0 absolute -left-96'
        type='file'
        ref={e => setInputElement(e)}
        accept='image/*'
        onChange={handleFileChange}
      />
    </div>
  )
}
