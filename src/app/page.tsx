'use client'
import { useSupabase } from './providers'
import { Button } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function Home () {
  const { supabase } = useSupabase()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    supabase.auth.getSession().then((res: any) => setUser(res.data.session.user.user_metadata))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <main>
      {user && (
        <div className='mb-6 flex flex-col justify-center gap-1'>
          <Image src={user.avatar_url} width='200' height='0' alt='avatar' className='rounded-full border-4 border-blue-700 p-1' />
          <h3>@{user.full_name}</h3>
          <h4>{user.email}</h4>
        </div>
      )}
      <Button onClick={() => supabase.auth.signOut()} color='primary'>Logout</Button>
    </main>
  )
}
