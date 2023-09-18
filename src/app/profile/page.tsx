'use client'
import { useSupabase } from '../providers'
import { useData } from '@/store'
import { Button } from '@nextui-org/react'
import Image from 'next/image'

export default function Profile () {
  const { supabase } = useSupabase()
  const { user, setStore } = useData()

  const logout = () => supabase.auth.signOut().then(() => setStore('user', null))

  return (
    <main>
      {user && (
        <div className='mb-6 flex flex-col justify-center gap-1'>
          <Image
            src={user.user.user_metadata.avatar_url}
            width='200'
            height='0'
            alt='avatar'
            className='rounded-full border-4 border-blue-700 p-1'
          />
          <h3>@{user.user.user_metadata.full_name}</h3>
          <h4>{user.user.user_metadata.email}</h4>
        </div>
      )}
      <Button onClick={logout} color='primary'>Logout</Button>
    </main>
  )
}
