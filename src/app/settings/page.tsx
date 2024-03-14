import { Address } from './Address'
import { BankAccount } from './BankAccount'

export default function Settings () {
  return (
    <main className='flex flex-col gap-10'>
      <Address />
      <BankAccount />
    </main>
  )
}
