import Image from 'next/image'
import { Card, CardBody, Avatar, CardFooter, Switch } from '@nextui-org/react'
import { useData } from '@/store'
import { useSupabase } from '@/app/providers'

export function ProductCard ({ product }: { product: any }) {
  const { products, setStore } = useData()
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
  return (
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
            <Avatar src={product?.influencers?.avatar || null} />
            <div>
              <p className='text-xl'>
                {product.name}
              </p>
              <p className='opacity-60'>
                {product?.influencers?.full_name || 'unknown'}
              </p>
            </div>
          </div>
          <p className='opacity-70'>
            {
              product.price.toLocaleString('es-Es', {
                style: 'currency',
                currency: 'COP',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
                useGrouping: true
              })
            }
          </p>
        </div>
      </CardBody>
      <CardFooter>
        <div className='w-full flex justify-around'>
          <p className='opacity-60'>
            {product.state ? 'activo' : 'apagado'}
          </p>
          <Switch
            color='secondary'
            isSelected={product.state}
            onClick={() => setKitchenState(product)}
          />
        </div>
      </CardFooter>
    </Card>
  )
}
