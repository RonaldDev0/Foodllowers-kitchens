'use client'
import { useState } from 'react'
import Image from 'next/image'
import { Card, CardBody, Avatar, CardFooter, Switch, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, useDisclosure, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/react'
import { useData } from '@/store'
import { useSupabase } from '@/app/providers'
import { Settings, Trash } from 'lucide-react'

export function ProductCard ({ product }: { product: any }) {
  const { supabase } = useSupabase()
  const { products, setStore } = useData()

  const { isOpen: isOpenEdit, onOpen: onOpenEdit, onOpenChange: onOpenEditChange } = useDisclosure()
  const { isOpen: isOpenDelete, onOpen: onOpenDelete, onOpenChange: onOpenDeleteChange } = useDisclosure()

  const [isLoadingEdit, setIsLoadingEdit] = useState(false)
  const [isLoadingDelete, setIsLoadingDelete] = useState(false)

  const setProductState = (product: any) => {
    supabase
      .from('products')
      .update({ state: !product.state })
      .eq('id', product.id)
      .select()
      .then(({ error, data }) => {
        if (error || !data) return

        const index = products.findIndex((p: any) => p.id === product.id)
        const updatedProducts = [...products]
        updatedProducts[index] = { ...products[index], state: data[0].state }
        setStore('products', updatedProducts)
      })
  }

  function handleSubmitEdit (onClose: Function) {
    setIsLoadingEdit(true)

    setIsLoadingEdit(false)
    onClose()
  }

  function handleSubmitDelete (onClose: Function) {
    setIsLoadingDelete(true)

    supabase
      .from('products')
      .delete()
      .eq('id', product.id)
      .then(() => {
        supabase
          .storage
          .from('products')
          .remove([product.preview.split('/').pop()])
          .then(() => {
            setStore('products', products.filter((p: any) => p.id !== product.id))
            setIsLoadingDelete(false)
            onClose()
          })
      })
  }

  return (
    <>
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
              <DropdownItem
                key='edit'
                onPress={onOpenEdit}
              >
                Editar producto
              </DropdownItem>
              <DropdownItem
                key='delete'
                onClick={onOpenDelete}
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
              onClick={() => setProductState(product)}
            />
          </div>
        </CardFooter>
      </Card>
      <Modal isOpen={isOpenEdit} onOpenChange={onOpenEditChange}>
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader>
                Editar Producto
              </ModalHeader>
              <ModalBody>
                body
              </ModalBody>
              <ModalFooter>
                <Button
                  className={`${isLoadingEdit ? 'opacity-60 cursor-not-allowed' : ''} w-full font-semibold text-lg`}
                  color='secondary'
                  onPress={() => handleSubmitEdit(onClose)}
                  disabled={isLoadingEdit}
                >
                  {isLoadingEdit ? 'cargando...' : 'Guardar'}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal isOpen={isOpenDelete} onOpenChange={onOpenDeleteChange}>
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader>
                <div className='w-full flex items-center gap-8'>
                  Borrar Producto
                  <Trash size={25} />
                </div>
              </ModalHeader>
              <ModalBody>
                <div className='flex flex-col gap-3'>
                  <p>¿Estás seguro de que quieres borrar este producto?</p>
                  <p>Esta acción no se puede deshacer.</p>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  className={`${isLoadingDelete ? 'opacity-60 cursor-not-allowed' : ''} w-full font-semibold text-lg`}
                  color='danger'
                  onPress={() => handleSubmitDelete(onClose)}
                  disabled={isLoadingDelete}
                >
                  {isLoadingDelete ? 'cargando...' : 'Borrar'}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
