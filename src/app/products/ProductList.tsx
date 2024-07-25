'use client'
import { useSupabase } from '../providers'
import { useEffect } from 'react'
import { useData } from '@/store'
import { ProductCard } from './ProductCard'

export default function ProductList () {
  const { kitchenId, products, setStore } = useData()
  const { supabase } = useSupabase()

  useEffect(() => {
    if (kitchenId && !products) {
      supabase
        .from('products')
        .select('id, preview, name, category, description, price, state, influencers( full_name, avatar )')
        .match({ id_kitchen: kitchenId })
        .then(({ error, data }) => {
          if (error) return

          setStore('products', data)
        })
    }
  }, [kitchenId])

  return (
    <div className='flex flex-wrap gap-5 justify-center max-w-7xl'>
      {products?.map((product: any) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  )
}
