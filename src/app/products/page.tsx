'use client'
import { useSupabase } from '../providers'
import { useEffect } from 'react'
import { useData } from '@/store'
import Image from 'next/image'
import { Card, CardBody, Avatar, CardFooter, Switch } from '@nextui-org/react'

export default function Products () {
  const { kitchenId, products, setStore } = useData()
  const { supabase } = useSupabase()

  const setKitchenState = (product: any) => {
    supabase
      .from('products')
      .update({ state: !product.state })
      .eq('id', product.id)
      .select()
      .then(res => {
        if (res.data) {
          const index = products.findIndex((p: any) => p.id === product.id)
          const updatedProducts = [...products]
          updatedProducts[index] = { ...products[index], state: res.data[0].state }
          setStore('products', updatedProducts)
        }
      })
  }

  useEffect(() => {
    if (kitchenId && !products) {
      supabase
        .from('products')
        .select('id, preview, name, category, description, price, state, influencers( full_name, avatar )')
        .match({
          id_kitchen: kitchenId
        })
        .then(res => {
          if (res.data?.length) {
            setStore('products', res.data)
          }
        })
    }
  }, [kitchenId])

  return (
    <main className='flex flex-wrap gap-5 justify-center max-w-7xl'>
      {products?.map((product: any) => (
        <Card key={product.id}>
          <CardBody className='p-0'>
            <Image
              src={product.preview}
              width='384'
              height='200'
              alt='preview'
              className='w-96 h-[200px]'
            />
            <div className='p-4 flex justify-between items-center'>
              <div className='flex gap-3 items-center'>
                <Avatar src={product.influencers.avatar} />
                <div>
                  <p className='text-xl'>{product.name}</p>
                  <p className='opacity-60'>{product.influencers.full_name}</p>
                </div>
              </div>
              <p className='font-bold text-green-600'>
                ${product.price.toLocaleString()}
              </p>
            </div>
          </CardBody>
          <CardFooter>
            <div className='w-full flex justify-around'>
              <p className='opacity-60'>{product.state ? 'activo' : 'apagado'}</p>
              <Switch color='secondary' isSelected={product.state} onClick={() => setKitchenState(product)} />
            </div>
          </CardFooter>
        </Card>
      ))}
    </main>
  )
}
