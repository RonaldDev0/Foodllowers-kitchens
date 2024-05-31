/* eslint-disable camelcase */
import { supabase } from './supabase'

export async function updateOrderWithDeliveryID (orderID: string, delivery_id: string) {
  const { error }: any = await supabase
    .from('orders')
    .update({ delivery_id, order_state: 'buscando delivery...' })
    .eq('id', orderID)

  if (error) return { error }
}
