/* eslint-disable camelcase */
import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'
import { calculateHaversineDistance } from './calculateHaversineDistance'

const schema = z.object({
  kitchen_address: z.object({
    formatted_address: z.string(),
    geometry: z.object({
      location: z.object({
        lat: z.number(),
        lng: z.number()
      })
    })
  }),
  user_name: z.string().nullable(),
  user_email: z.string().nullable(),
  user_address: z.object({
    number: z.string().optional().nullable(),
    aditional_info: z.string().optional().nullable(),
    formatted_address: z.string(),
    geometry: z.object({
      location: z.object({
        lat: z.number(),
        lng: z.number()
      })
    })
  })
})

export async function POST (req: NextRequest) {
  try {
    const body = await req.json()
    const { kitchen_address, user_address, user_name, user_email } = schema.parse(body)

    // create order with fuego Burguer Product
    const { data: orderID, error: OrderError } = await supabase
      .from('orders')
      .insert([{
        user_id: 'cbeb57ee-e13b-4e51-9c0c-51f0b0c48c63', // ronaldsito7745@gmail.com
        user_name: user_name || 'Desconocido',
        product: null,
        order_state: 'buscando delivery...',
        kitchen_id: 'd791a2aa-0fd0-43e4-8819-459be503b5f2', // FuegoBurguer (ronaldsito7745@gmail.com)
        influencer_id: '121ef1b2-39c1-4810-aa0c-20cd634f4d35', // WestCOL (ronaldsito7745@gmail.com)
        user_address: {
          ...user_address,
          aditionalInfo: user_address.aditional_info
        },
        kitchen_address,
        invoice_id: null,
        user_email: user_email || 'Desconocido',
        payment_status: 'approved',
        preferences: null,
        pickUpInStore: false,
        transaction_amount: {
          mercadopago: 0,
          influencer: 0,
          kitchen: 0,
          delivery: { service: 0, tip: 0 }, // pending
          earnings: 1000,
          total: 1000
        }
      }])
      .select('id')

    if (OrderError) {
      return NextResponse.json({ error: OrderError }, { status: 500 })
    }

    // get dleivery id
    const { deliveryId, error: DeliveryError } = await supabase
      .from('deliverys')
      .select('id, current_location')
      .match({
        active: true,
        free: true,
        register_complete: true,
        register_step: 'finished'
      }).then(({ data, error }) => {
        if (error) return { error }
        if (data.length === 0) return { error: 'No se encontraron deliverys activos' }

        let closestDelivery = ''
        let shortestDistance = Infinity

        data.forEach(({ id, current_location }) => {
          const distance = calculateHaversineDistance(kitchen_address.geometry.location, current_location)
          if (distance < shortestDistance && distance < 15) {
            shortestDistance = distance
            closestDelivery = id
          }
        })

        return { deliveryId: closestDelivery, error: false }
      })

    if (DeliveryError) {
      return NextResponse.json({ error: DeliveryError, orderID })
    }

    // update order state with delivery id
    const { error } = await supabase
      .from('orders')
      .update({ delivery_id: deliveryId, order_state: 'recogiendo...' })
      .eq('id', orderID[0].id)

    if (error) throw new Error('Error interno del servidor')

    // update delivery state
    const { error: DeliveryUpdateError } = await supabase
      .from('deliverys')
      .update({ free: false })
      .eq('id', deliveryId)

    if (DeliveryUpdateError) throw new Error('Error interno del servidor')

    return NextResponse.json({ deliveryId, orderID }, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error }, { status: 400 })
    }

    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}
