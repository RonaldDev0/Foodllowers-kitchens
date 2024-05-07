import { Balance } from './Balance'
import { History } from './History'

export default function DashboardPage () {
  return (
    <main className='flex flex-col justify-center items-center gap-10'>
      <Balance />
      <History />
    </main>
  )
}
