import { supabase } from '../supabase'
import { calculateHaversineDistance } from './calculateHaversineDistance'

interface ISearchResult {
  error: string | null
  delivery_id?: string
}

interface IAddress {
  lat: number
  lng: number
}

export async function searchMostCloseDelivery (kitchenAddress: IAddress): Promise<ISearchResult> {
  const { data, error } = await supabase
    .from('deliverys')
    .select('id, current_location')
    .eq('register_complete', true)
    .eq('active', true)
    .eq('free', true)

  if (error) return { error: error.message }

  let closestDeliveryId = ''
  let shortestDistance = Infinity

  data.forEach(delivery => {
    const distance: number = calculateHaversineDistance(kitchenAddress, delivery.current_location).kilometers
    if (distance < shortestDistance) {
      shortestDistance = distance
      closestDeliveryId = delivery.id
    }
  })

  return { delivery_id: closestDeliveryId, error: null }
}
