'use client'
import { useEffect, useState } from 'react'
import { Address } from './Address'
import { useData } from '@/store'

export function Setup () {
  const { kitchenAddress } = useData()
  const [showAddressComponent, setShowAddressComponent] = useState(false)

  function handleValidation () {
    if (!kitchenAddress) {
      setShowAddressComponent(true)
    }
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      handleValidation()
    }, 1000)

    return () => clearTimeout(timeout)
  }, [kitchenAddress])

  return (
    showAddressComponent && <Address setShowAddressComponent={setShowAddressComponent} />
  )
}
