'use client'
import { createContext, useEffect, ReactNode } from 'react'
import { useSupabase } from '@/app/providers'
import { useUser } from '@/store'

type IContext = {
  user: any
}

const Context = createContext<IContext>({
  user: undefined
})

export function UserProvider ({ children }: { children: ReactNode }) {
  const { supabase } = useSupabase()
  const { user, setStore } = useUser()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }: any) => {
      session && setStore('user', session)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Context.Provider value={{ user }}>
      {children}
    </Context.Provider>
  )
}
