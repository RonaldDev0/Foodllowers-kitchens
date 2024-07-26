'use client'
import { useState, useEffect } from 'react'
import { Card, CardHeader, CardBody, CardFooter, Button, useDisclosure, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, Select, SelectItem, Textarea } from '@nextui-org/react'
import { ImgItem } from './ImgItem'
import { useData } from '@/store'
import { useSupabase } from '../providers'

interface TCleanProduct {
  id_kitchen: null | string,
  category: null | string,
  price: string,
  name: null | string,
  description: any,
  state: null | boolean
}

export default function NewProduct () {
  const { supabase } = useSupabase()
  const { kitchenId, products, setStore } = useData()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const [isLoading, setIsLoading] = useState(false)
  const [product, setProduct] = useState<TCleanProduct>({
    id_kitchen: kitchenId,
    category: null,
    price: '',
    name: null,
    description: null,
    state: true
  })

  const [img, setImg] = useState<any>(null)

  function formatPrice (price: string) {
    const priceFormat = price.replace(/\./g, '').replace(/[^0-9.]/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '.')

    return priceFormat
  }

  function handleChange (name: string, value: any) {
    setProduct(prev => ({ ...prev, [name]: value }))
  }

  function handleSubmit (onClose: Function) {
    setIsLoading(true)

    if (isLoading) return

    supabase
      .from('products')
      .insert({ ...product, price: parseFloat(product.price.replace('.', '')) })
      .select('id')
      .then(({ error, data }) => {
        if (error) return
        const productId = data[0].id

        supabase
          .storage
          .from('products')
          .upload(`${data[0].id}.${img.type.split('/')[1]}`, img)
          .then(({ error, data }) => {
            if (error || !data.path) return

            const { data: { publicUrl } } = supabase
              .storage
              .from('products')
              .getPublicUrl(data.path)

            supabase
              .from('products')
              .update({ preview: publicUrl })
              .eq('id', productId)
              .select('*')
              .then(({ error, data }) => {
                if (error) return
                setStore('products', [...products, data[0]])
                onClose()
                setIsLoading(false)
                setImg(null)
                setProduct({
                  id_kitchen: kitchenId,
                  category: null,
                  price: '',
                  name: null,
                  description: null,
                  state: true
                })
              })
          })
      })
  }

  useEffect(() => {
    if (!kitchenId) return
    setProduct(prev => ({ ...prev, id_kitchen: kitchenId }))
  }, [kitchenId])

  return (
    <>
      <Card className='w-96'>
        <CardHeader>
          <h2 className='text-xl font-semibold'>
            Agregar producto
          </h2>
        </CardHeader>
        <CardBody>
          <p>Tienes un producto que no está en la lista? Agregalo a continuación.</p>
        </CardBody>
        <CardFooter>
          <Button
            className='w-full font-semibold text-lg'
            color='secondary'
            onClick={onOpen}
          >
            Agregar producto
          </Button>
        </CardFooter>
      </Card>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader>
                Agregar producto
              </ModalHeader>
              <ModalBody>
                <div className='flex flex-col gap-4'>
                  <ImgItem
                    value={img}
                    setValue={setImg}
                  />
                  <Input
                    type='text'
                    placeholder='Nombre del producto'
                    value={product.name ?? ''}
                    onChange={e => handleChange('name', e.target.value)}
                  />
                  <div className='flex gap-4'>
                    <Select
                      size='sm'
                      label='Categoria'
                      className='w-full'
                      value={product.category ?? ''}
                      onChange={e => handleChange('category', e.target.value)}
                    >
                      <SelectItem key='fast food'>
                        fast food
                      </SelectItem>
                    </Select>
                    <Input
                      size='lg'
                      type='text'
                      placeholder='Precio'
                      value={product.price}
                      onChange={e => handleChange('price', formatPrice(e.target.value))}
                      labelPlacement='outside'
                      startContent={
                        <div className='pointer-events-none flex items-center'>
                          <span className='text-default-400 text-small'>$</span>
                        </div>
                      }
                    />
                  </div>
                  <Textarea
                    placeholder='Descripción'
                    value={product.description ?? ''}
                    onChange={e => handleChange('description', e.target.value)}
                    minRows={6}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  className={`${isLoading ? 'opacity-60 cursor-not-allowed' : ''} w-full font-semibold text-lg`}
                  color='secondary'
                  onPress={() => handleSubmit(onClose)}
                  disabled={isLoading}
                >
                  {isLoading ? 'cargando...' : 'Agregar'}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
