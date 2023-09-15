'use client'
import { useSupabase } from '../providers'
import { Button } from '@nextui-org/react'

export default function Home () {
  const { supabase } = useSupabase()
  const handleLogin = async () => await supabase.auth.signInWithOAuth({ provider: 'google' })

  return (
    <main className='h-screen flex justify-center items-center'>
      <Button onClick={handleLogin} color='primary'>Login With google</Button>
    </main>
  )
}
