import Image from 'next/image'
import { Card, CardBody, Avatar, CardFooter, Switch, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react'
import { useData } from '@/store'
import { useSupabase } from '@/app/providers'
import { Settings } from 'lucide-react'

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

  function remove () {}

  function onOpen () {}

  return (
    <Card key={product.id}>
      <CardBody className='p-0 group'>
        <Image
          src={product.preview}
          width='384'
          height='200'
          alt='preview'
          className='w-96 h-[200px]'
        />
        <Dropdown>
          <DropdownTrigger>
            <Button
              color='primary'
              variant='light'
              size='sm'
              className='absolute right-1 top-1 group-hover:opacity-100 opacity-0 transition-all'
            >
              <Settings size={25} />
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label='Static Actions'>
            <DropdownItem key='edit' onPress={onOpen}>
              Editar producto
            </DropdownItem>
            <DropdownItem
              key='delete'
              onClick={remove}
              className='text-danger'
              color='danger'
            >
              Borrar producto
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <div className='p-4 flex justify-between items-center'>
          <div className='flex gap-3 items-center'>
            <Avatar src={product?.influencers?.avatar || null} />
            <div>
              <p className='text-xl'>
                {product.name}
              </p>
              <p className='opacity-60'>
                {product?.influencers?.full_name || 'desconocido'}
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
