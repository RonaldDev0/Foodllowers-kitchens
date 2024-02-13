'use client'
import { useData } from '@/store'

export function ActivationCode () {
  const { ActivationCode } = useData()

  return (
    <div className='w-full flex justify-center gap-3 mt-5 text-lg'>
      <p>Codigo de activación:</p>
      <p className='font-bold'>{ActivationCode}</p>
    </div>
  )
}
