'use client'
import { useEffect } from 'react'
import { useData } from '@/store'
import { Howl } from 'howler'
import { Toaster, toast } from 'sonner'

export function SoundAlert () {
  const { soundAlert, setStore, darkMode } = useData()
  const sound = new Howl({ src: ['../../alert.mp3'] })

  const play = () => {
    toast.info('Tienes una nueva orden')
    sound.play()
    setTimeout(() => setStore('soundAlert', false), 1000)
  }

  useEffect(() => {
    if (!soundAlert) return
    play()
  }, [soundAlert])

  return (
    <Toaster
      expand
      richColors
      theme={darkMode ? 'dark' : 'light'}
    />
  )
}
