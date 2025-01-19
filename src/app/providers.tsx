'use client'

import { NextUIProvider } from '@nextui-org/react'
import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useData } from '@/store'
import type { SupabaseClient } from '@supabase/auth-helpers-nextjs'

type Database = {
  public: {
    Tables: {
      movies: {
        Row: {}
        Insert: {}
        Update: {}
      }
    }
  }
}

type SupabaseContext = {
  supabase: SupabaseClient<Database>
}

const Context = createContext<SupabaseContext | undefined>(undefined)

export function Providers ({ children }: { children: ReactNode }) {
  const [supabase] = useState(() => createPagesBrowserClient())
  const router = useRouter()
  const { addOrder, setStore, orders, currentOrders, kitchen } = useData()

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => router.refresh())

    return () => subscription.unsubscribe()
  }, [router, supabase])

  useEffect(() => {
    if (!kitchen) return
    if (!kitchen.register_complete) {
      switch (kitchen.register_step) {
        case 'data_collection':
          router.push('/register')
          break
        case 'data_validation':
          router.push('/validation')
          break
      }
    }
  }, [kitchen])

  useEffect(() => {
    supabase.auth.getSession()
      .then(({ data: { session } }: any) => {
        if (session) {
          setStore('kitchenToken', { access_token: session.access_token, refresh_token: session.refresh_token })
          setStore('user', session.user)
          supabase
            .from('kitchens')
            .select('id, address, activation_code, bank_account, register_step, register_complete, chamber_of_commerce, health, phone_number')
            .eq('user_id', session.user.id)
            .then(({ data, error }) => {
              if (error) return
              if (!data?.length) {
                supabase
                  .from('kitchens')
                  .insert([{ user_id: session.user.id, email: session.user.email }])
                  .select('*')
                  .then(({ data, error }) => {
                    if (error) return
                    setStore('kitchen', data[0])
                    setStore('kitchenId', data[0].id)
                  })
              }
              if (data?.length) {
                const kitchenId = data[0].id
                setStore('kitchenId', kitchenId)
                setStore('kitchenAddress', data[0].address)
                setStore('ActivationCode', data[0].activation_code)
                setStore('kitchen', data[0])
                supabase
                  .from('orders')
                  .select('id, order_state, invoice_id, product, preferences, delivery_id, transaction_amount, pickUpInStore')
                  .eq('kitchen_id', kitchenId)
                  .eq('payment_status', 'approved')
                  .in('order_state', ['buscando cocina...', 'cocinando...', 'buscando delivery...'])
                  .then(({ data }) => {
                    setStore('orders', data?.filter(order => order.order_state === 'buscando cocina...'))
                    setStore('currentOrders', data?.filter(order => order.order_state === 'cocinando...'))
                    supabase.channel('orders').on(
                      'postgres_changes',
                      {
                        event: '*',
                        schema: 'public',
                        table: 'orders',
                        filter: `kitchen_id=eq.${kitchenId}`
                      },
                      (payload: any) => {
                        if (payload.eventType === 'DELETE') {
                          setStore('orders', orders?.filter(order => order.id !== payload.new.id))
                          setStore('currentOrders', currentOrders?.filter(order => order.id !== payload.new.id))
                          return
                        }
                        if (payload.eventType === 'INSERT' || payload.eventType === 'UPDATE') {
                          if (payload.new.payment_status === 'approved' && payload.new.product !== null && payload.eventType === 'INSERT') setStore('soundAlert', true)
                          if (payload.new.product && payload.new.payment_status === 'approved') return addOrder(payload.new)

                          supabase
                            .from('orders')
                            .select('id, order_state, invoice_id, product, preferences, delivery_id, transaction_amount, pickUpInStore')
                            .eq('kitchen_id', kitchenId)
                            .eq('payment_status', 'approved')
                            .in('order_state', ['buscando cocina...', 'cocinando...', 'buscando delivery...'])
                            .then(({ data }) => {
                              setStore('orders', data?.filter(order => order.order_state === 'buscando cocina...'))
                              setStore('currentOrders', data?.filter(order => order.order_state === 'cocinando...'))
                            })
                        }
                      }
                    ).subscribe()
                  })
              }
            })
        }
      })
  }, [])

  return (
    <Context.Provider value={{ supabase }}>
      <NextUIProvider>
        {children}
      </NextUIProvider>
    </Context.Provider>
  )
}

export const useSupabase = () => {
  const context = useContext(Context)

  if (context === undefined) {
    throw new Error('useSupabase must be used inside SupabaseProvider')
  }

  return context
}
