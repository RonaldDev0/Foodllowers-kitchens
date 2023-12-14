// 'use client'
// import { useData } from '@/store'
// import { useSupabase } from '../providers'
// import { useEffect } from 'react'

export default function Dashboard () {
  // const { supabase } = useSupabase()
  // const { shipments, setStore } = useData()

  // useEffect(() => {
  //   if (!shipments) {
  //     supabase
  //       .from('shipments')
  //       .select()
  //       .then(res => {
  //         if (res.data) {
  //           setStore('shipments', res.data)
  //         }
  //       })
  //   }
  // }, [])

  return (
    <main>
      <p>1- mostrar todos los graficos respectivos</p>
      <p>2- ventas / tiempo</p>
      <p>3- periodos anteriores</p>
      <p>4- producto mas vendido</p>
      <p>5- horas con mas ventas</p>
      <p>6- influencer que mas genera ventas</p>
      <p>7- preferencias de los clientes</p>
      <p>8- feedback</p>
    </main>
  )
}
