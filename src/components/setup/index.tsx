'use client'
import { useEffect, useState } from 'react'
import { Address } from './Address'
import { useData } from '@/store'
import { BankAccount } from './BankAccount'

export function Setup () {
  const { kitchen } = useData()
  const [showAddressComponent, setShowAddressComponent] = useState(false)

  function handleValidation () {
    if (!kitchen.address) {
      setShowAddressComponent(true)
    }
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      handleValidation()
    }, 1000)

    return () => clearTimeout(timeout)
  }, [kitchen])

  return (
    <>
      {showAddressComponent && <Address setShowAddressComponent={setShowAddressComponent} />}
      <BankAccount />
    </>
  )
}
