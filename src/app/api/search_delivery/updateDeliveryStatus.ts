/* eslint-disable camelcase */
import { supabase } from './supabase'

export async function updateDeliveryStatus (delivery_id: string) {
  const { error }: any = await supabase
    .from('deliverys')
    .update({ free: false })
    .eq('id', delivery_id)

  if (error) return { error }
}
