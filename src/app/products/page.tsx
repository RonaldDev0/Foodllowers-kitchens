import NewProduct from './NewProduct'
import ProductList from './ProductList'

export default function Products () {
  return (
    <main className='flex flex-col gap-8 justify-center items-center'>
      <NewProduct />
      <ProductList />
    </main>
  )
}
