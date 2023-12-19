'use client'
import Link from 'next/link'
import { useData } from '@/store'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, Card, CardHeader } from '@nextui-org/react'
import { useState, useEffect } from 'react'
import { Home, User, BarChart3, Moon, Sun, LogOut, ChefHat } from 'lucide-react'
import { useSupabase } from '../app/providers'

export function NavBarr () {
  const { supabase } = useSupabase()
  const { user, setStore } = useData()
  const [darkMode, setDarkMode] = useState<boolean>(true)

  const logout = () => {
    supabase.auth.signOut()
      .then(() => setStore('user', null))
  }

  useEffect(() => {
    if (!darkMode) {
      document.documentElement.classList.remove('dark')
      return
    }
    document.documentElement.classList.add('dark')
  }, [darkMode])

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
            <BarChart3 size={28} />
          </Link>
          <Dropdown>
            <DropdownTrigger>
              <Avatar size='md' className='cursor-pointer' src={user.user_metadata.avatar_url} />
            </DropdownTrigger>
            <DropdownMenu aria-label='Static Actions'>
              <DropdownItem href='/profile'>
                <div className='flex gap-3'>
                  <User />
                  <p>Profile</p>
                </div>
              </DropdownItem>
              <DropdownItem onPress={() => setDarkMode(true)}>
                <div className='flex gap-3'>
                  <Moon />
                  <p>Dark theme</p>
                </div>
              </DropdownItem>
              <DropdownItem onPress={() => setDarkMode(false)}>
                <div className='flex gap-3'>
                  <Sun />
                  <p>Light theme</p>
                </div>
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
