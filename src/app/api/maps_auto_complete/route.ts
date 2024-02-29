import { NextRequest, NextResponse } from 'next/server'

export async function POST (req: NextRequest) {
  const { place } = await req.json()

  const address = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(place)}, Bogotá&bounds=4.524361711687331,-74.20901080492014|4.77892461009049,-74.01207250779134&components=country:co&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}`)
    .then(res => res.json())

  return NextResponse.json(address)
}
