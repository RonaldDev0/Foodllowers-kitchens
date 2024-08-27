import { NextRequest, NextResponse } from 'next/server'
import Twilio from 'twilio'

const twilio = Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)

export async function POST (req: NextRequest) {
  const { code, number } = await req.json()

  const message = await twilio.messages.create({
    from: process.env.TWILIO_PHONE_NUMBER,
    to: '+57' + number,
    body: `Tu codigo de verificación para Foodllowers-Kitchens es: ${code}`
  })

  // console.log(message)

  return NextResponse.json(message)
}
