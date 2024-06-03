/* eslint-disable camelcase */
import { NextRequest, NextResponse } from 'next/server'
import { updateOrderWithDeliveryID } from './updateOrderWithDeliveryID'
import { updateDeliveryStatus } from './updateDeliveryStatus'
import { searchMostCloseDelivery } from './searchMostCloseDelivery'

export async function POST (req: NextRequest) {
  const { kitchenAddress, orderID } = await req.json()
  if (!kitchenAddress || !orderID) {
    return NextResponse.json({ error: 'kitchenAddress or orderID is missing' })
  }

  const { delivery_id, error } = await searchMostCloseDelivery(kitchenAddress)
  if (error || !delivery_id) {
    return NextResponse.json({ error: 'delivery not found' })
  }
  updateOrderWithDeliveryID(orderID, delivery_id)
  updateDeliveryStatus(delivery_id)

  return NextResponse.json({ success: true })
}
