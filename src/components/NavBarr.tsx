'use client'
import Link from 'next/link'
import { useData } from '@/store'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, Card, CardHeader } from '@nextui-org/react'
import { Home, User, History, LogOut, ChefHat, Settings } from 'lucide-react'
import { useSupabase } from '../app/providers'

export function NavBarr () {
  const { supabase } = useSupabase()
  const { user, setStore } = useData()

  const logout = () => {
    supabase.auth.signOut()
      .then(() => setStore('user', null))
  }

  if (!user) {
    return null
  }

  return (
    <nav className='w-full flex justify-around items-center mb-5 mt-5'>
      <Card className='w-96'>
        <CardHeader className='flex justify-around'>
          <Link href='/'>
            <Home size={28} />
          </Link>
          <Link href='/products'>
            <ChefHat size={28} />
          </Link>
          <Link href='/dashboard'>
            <History size={28} />
          </Link>
          <Dropdown>
            <DropdownTrigger>
              <Avatar size='md' className='cursor-pointer' src={user.user_metadata.avatar_url} />
            </DropdownTrigger>
            <DropdownMenu aria-label='Static Actions'>
              <DropdownItem>
                <Link href='/settings'>
                  <div className='flex gap-3'>
                    <Settings />
                    <p>Settings</p>
                  </div>
                </Link>
              </DropdownItem>
              <DropdownItem>
                <Link href='/profile'>
                  <div className='flex gap-3'>
                    <User />
                    <p>Profile</p>
                  </div>
                </Link>
              </DropdownItem>
              <DropdownItem onPress={logout} className='text-danger' color='danger'>
                <div className='flex gap-3'>
                  <LogOut />
                  <p>Logout</p>
                </div>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </CardHeader>
      </Card>
    </nav>
  )
}
