import { NextRequest, NextResponse } from 'next/server'

export async function POST (req: NextRequest) {
  const { lat, lng } = await req.json()

  const address = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat + ',' + lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}`)
    .then(res => res.json())

  return NextResponse.json(address)
}
