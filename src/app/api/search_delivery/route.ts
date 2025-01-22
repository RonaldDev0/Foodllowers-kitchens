/* eslint-disable camelcase */
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { calculateHaversineDistance } from '../calculateHaversineDistance'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

export async function POST (req: NextRequest) {
  const { kitchenAddress, orderID, kitchenToken } = await req.json()
  if (!kitchenAddress || !orderID || !kitchenToken) {
    return NextResponse.json({ error: 'kitchenAddress or orderID or kitchenToken is missing' })
  }
  // log as a kitchen
  await supabase.auth.setSession(kitchenToken)

  // get delivery id
  const { delivery_id, error } = await supabase
    .from('deliverys')
    .select('id, current_location')
    .match({ register_complete: true, active: true, free: true })
    .then(({ data, error }) => {
      if (error) return { error }
      if (data.length === 0) return { error: 'no se encontraron deliverys disponibles' }

      let closestDeliveryId = ''
      let shortestDistance = Infinity

      data.forEach(({ id, current_location }) => {
        const distance = calculateHaversineDistance(kitchenAddress, current_location)
        if (distance < shortestDistance && distance < 15) {
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
    .update({ delivery_id, order_state: 'recogiendo...' })
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

  return NextResponse.json({ error: false, data: { delivery_id, orderID } })
}
