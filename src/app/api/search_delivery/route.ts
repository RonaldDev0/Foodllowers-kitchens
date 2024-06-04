/* eslint-disable camelcase */
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { calculateHaversineDistance } from './calculateHaversineDistance'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

export async function POST (req: NextRequest) {
  const { kitchenAddress, orderID } = await req.json()
  if (!kitchenAddress || !orderID) {
    return NextResponse.json({ error: 'kitchenAddress or orderID is missing' })
  }

  // get delivery id
  const { delivery_id, error } = await supabase
    .from('deliverys')
    .select('id, current_location')
    .match({ register_complete: true, active: true, free: true })
    .then(({ data, error }) => {
      if (error) return { error }
       if (data.length === 0) return { error: 'no delivery found' }

      let closestDeliveryId = ''
      let shortestDistance = Infinity

      data.forEach(({ id, current_location }) => {
        const distance = calculateHaversineDistance(kitchenAddress, current_location)
        if (distance < shortestDistance) {
          shortestDistance = distance
          closestDeliveryId = id
        }
      })

      return { delivery_id: closestDeliveryId, error: false }
    })

  if (error || !delivery_id) {
    return NextResponse.json({ error, success: false })
  }


  // update order state
  const { error: updateOrderError } = await supabase
    .from('orders')
    .update({ delivery_id, order_state: 'buscando delivery...' })
    .eq('id', orderID)

  if (updateOrderError) {
    return NextResponse.json({ error: updateOrderError, success: false })
  }


  // update delivery state
  const { error: updateDeliveryError } = await supabase
    .from('deliverys')
    .update({ free: false })
    .eq('id', delivery_id)

  if (updateDeliveryError) {
    return NextResponse.json({ error: updateDeliveryError, success: false })
  }

  return NextResponse.json({ error: false })
}
