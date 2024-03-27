'use client'
import { useData } from '@/store'
import { Card, CardHeader, CardBody, CardFooter, Button, Avatar } from '@nextui-org/react'
import Image from 'next/image'
import { useSupabase } from '@/app/providers'

interface Coordinate { latitude: number; longitude: number }
interface Distance { kilometers: number }

const earthRadius = 6371
const degToRad = Math.PI / 180

function convertDegreesToRadians (coordinate: Coordinate): Coordinate {
  return {
    latitude: coordinate.latitude * degToRad,
    longitude: coordinate.longitude * degToRad
  }
}

function calculateHaversineDistance (origin: Coordinate, destination: Coordinate): Distance {
  const originRad = convertDegreesToRadians(origin)
  const destinationRad = convertDegreesToRadians(destination)

  const difLat = destinationRad.latitude - originRad.latitude
  const difLon = destinationRad.longitude - originRad.longitude

  const sinDifLatDiv2 = Math.sin(difLat / 2)
  const sinDifLonDiv2 = Math.sin(difLon / 2)

  const a = sinDifLatDiv2 ** 2 + Math.cos(originRad.latitude) * Math.cos(destinationRad.latitude) * sinDifLonDiv2 ** 2
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  const distance = earthRadius * c

  return { kilometers: distance }
}

export function CurrentOrder () {
  const { currentOrder, kitchenAddress, setStore } = useData()
  const { supabase } = useSupabase()

  const finishOrder = () => {
    if (currentOrder) {
      supabase
        .from('deliverys')
        .select('id, current_location')
        .neq('register_complete', false)
        .neq('bank_account', null)
        .eq('active', true)
        .eq('free', true)
        .then(({ data }) => {
          if (data?.length) {
            const distances = data.map(delivery => ({
              delivery,
              distance: calculateHaversineDistance(kitchenAddress, delivery.current_location)
            }))

            distances.sort((a, b) => a.distance.kilometers - b.distance.kilometers)
            supabase
              .from('orders')
              .update({ delivery_id: distances[0].delivery.id })
              .eq('id', currentOrder.id)
              .select('*')
              .then(({ data }) => {
                if (data?.length) {
                  supabase
                    .from('orders')
                    .update({ order_state: 'buscando delivery...' })
                    .eq('id', currentOrder.id)
                    .select('*')
                    .then(({ data }) => {
                      if (data?.length === 0 || kitchenAddress === null) {
                        return
                      }
                      supabase
                        .from('deliverys')
                        .update({ free: false })
                        .eq('id', distances[0].delivery.id)
                        .select('id')
                        .then(() => {
                          if (data?.length) {
                            setStore('currentOrder', null)
                          }
                        })
                    })
                }
              })
          }
        })
    }
  }

  if (!currentOrder) {
    return
  }

  return (
    <div className='[@media(min-width:1000px)]:w-[24vw] [@media(max-width:800px)]:w-96]'>
      <Card>
        <CardHeader className='pb-0'>
          Pedido en preparación:
        </CardHeader>
        <CardBody>
          <div className='flex gap-3 mb-2'>
            <p>Numero de factura:</p>
            <div className='flex justify-center items-center'>
              <p>{currentOrder.invoice_id.slice(0, 6)}-</p>
              <p className='font-bold text-lg'>{currentOrder.invoice_id.slice(6, 10)}</p>
            </div>
          </div>
          <Image
            src={currentOrder.product.preview}
            width='200'
            height='250'
            alt='preview'
            className='rounded-lg w-full'
          />
          <div className='flex flex-col justify-around w-full py-2 gap-2'>
            <div className='flex justify-around'>
              <p className='text-large'>{currentOrder.product.name}</p>
              <p className='text-green-600 text-large'>
                ${currentOrder.product.price.toLocaleString()}
              </p>
            </div>
            <div className='flex justify-around'>
              <div className='flex gap-1 items-center'>
                <Avatar src={currentOrder.product.influencers.avatar} />
                <p className='opacity-80'>
                  {currentOrder.product.influencers.full_name}
                </p>
              </div>
              <div>
                {}
              </div>
            </div>
          </div>
        </CardBody>
        <CardFooter>
          <Button color='secondary' className='w-full' onPress={finishOrder}>
            Terminar Pedido
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
