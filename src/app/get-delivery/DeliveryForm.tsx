/* eslint-disable camelcase */
'use client'
import { Button, Input, Select, SelectItem, Card, CircularProgress } from '@nextui-org/react'
import { MapPin, InfoIcon } from 'lucide-react'
import { addresses } from './FuegoBurguerAddresses'
import { useState, useEffect, type FormEvent } from 'react'
import { Toaster, toast } from 'sonner'
import { useData } from '@/store'
import { useSupabase } from '../providers'

export function DeliveryForm ({ pendingDeliveryAssignmentOrders, setPendingDeliveryAssignmentOrders }: { pendingDeliveryAssignmentOrders: [], setPendingDeliveryAssignmentOrders: Function }) {
  const { supabase } = useSupabase()
  const { darkMode, kitchen, kitchenToken } = useData()

  const [input, setInput] = useState('')
  const [addressError, setAddressError] = useState(false)
  const [address, setAddress] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [openAutoComplete, setOpenAutoComplete] = useState(false)
  const [predictions, setPredictions] = useState<any>([])
  const [timeoutId, setTimeoutId] = useState<any>(null)

  const [kitchenAddress, setKitchenAddress] = useState<any>(JSON.parse(localStorage.getItem('kitchenAddress')!))
  const [kitchenAddressError, setKitchenAddressError] = useState(false)

  const [number, setNumber] = useState('')
  const [aditionalInfo, setAditionalInfo] = useState('')
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')

  const [buttonLoading, setButtonLoading] = useState(false)

  function handleChange (value: string) {
    if (timeoutId) clearTimeout(timeoutId)
    const newTimeoutId = setTimeout(() => {
      handleFetch(value)
    }, 500)
    setTimeoutId(newTimeoutId)
  }

  function handleFetch (value: string) {
    fetch('/api/maps_auto_complete', {
      cache: 'no-cache',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ place: value })
    })
      .then(res => res.json())
      .then(res => {
        if (res.error_message) return

        setLoading(false)
        setPredictions(res.results)
      })
  }

  function handlePredictionClick (prediction: any) {
    setAddressError(false)
    setAddress(prediction)
    setInput(prediction.formatted_address)
    setOpenAutoComplete(false)
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (!kitchenAddress) {
      setKitchenAddressError(true)
      return
    } else if (!address) {
      setAddressError(true)
      return
    }

    setButtonLoading(true)

    fetch('/api/get_only_delivery', {
      cache: 'no-cache',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        kitchen_address: kitchenAddress,
        user_address: {
          ...address,
          number,
          aditional_info: aditionalInfo
        },
        user_name: userName,
        user_email: userEmail
      })
    })
      .then(res => res.json())
      .then(data => {
        setButtonLoading(false)
        setInput('')
        setAddress(null)
        if (!data.deliveryId) {
          toast.info('Buscando domiciliario...')
          const id = data.orderID[0].id
          id && setPendingDeliveryAssignmentOrders([...pendingDeliveryAssignmentOrders, { id }])
          return
        }
        toast.success('Domiciliario solicitado')
      })
  }

  async function assignmentOrders () {
    while (pendingDeliveryAssignmentOrders.length > 0) {
      const orders = [...pendingDeliveryAssignmentOrders] // Copia de la lista actual para evitar problemas de referencia

      for (const { id } of orders) {
        if (!kitchenAddress) return

        try {
          const response = await fetch('/api/search_delivery', {
            cache: 'no-cache',
            method: 'POST',
            body: JSON.stringify({
              kitchenAddress: kitchenAddress.geometry.location,
              orderID: id,
              kitchenToken
            })
          })

          const { error, data } = await response.json()

          if (!error && data) {
            setPendingDeliveryAssignmentOrders((prev: any) =>
              prev.filter((order: any) => order.id !== data.orderID)
            )
            setButtonLoading(false)
            toast.success('Domiciliario asignado para la orden')
          }
        } catch (err) {
          // console.error(`Error asignando domiciliario a la orden ${id}:`, err)
        }
      }

      // Pausa de 30 segundos antes del siguiente ciclo
      await new Promise((resolve) => setTimeout(resolve, 30000))
    }
  }

  useEffect(() => {
    if (!kitchen || pendingDeliveryAssignmentOrders.length === 0) return

    assignmentOrders() // Ejecuta el procesamiento mientras haya órdenes pendientes
  }, [pendingDeliveryAssignmentOrders, kitchen])

  useEffect(() => {
    if (!kitchen) return

    supabase
      .from('orders')
      .select('id')
      .match({
        order_state: 'buscando delivery...',
        kitchen_id: 'd791a2aa-0fd0-43e4-8819-459be503b5f2'
      })
      .then(({ data, error }) => {
        if (error) return

        setPendingDeliveryAssignmentOrders(data)
      })
  }, [kitchen])

  return (
    <>
      <Toaster
        expand
        richColors
        theme={darkMode ? 'dark' : 'light'}
      />
      <form
        className='flex flex-col gap-3 bg-neutral-900 p-4 rounded-lg'
        onSubmit={onSubmit}
      >
        <Select
          selectedKeys={kitchenAddress ? [kitchenAddress.key] : []}
          className='w-96'
          label='Direccion de origen'
          isInvalid={kitchenAddressError}
          errorMessage={kitchenAddressError && 'La direccion es requerida'}
          onChange={(e) => {
            const number = Number(e.target.value)
            const newAddress = addresses[number - 1]

            setKitchenAddress(number > 0 ? newAddress : null)
            localStorage.setItem('kitchenAddress', JSON.stringify(newAddress))
            setKitchenAddressError(false)
          }}
        >
          {addresses.map((address) => (
            <SelectItem key={address.key}>
              {address.formatted_address}
            </SelectItem>
          ))}
        </Select>
        <div className='w-full rounded relative'>
          <div className='flex gap-2 justify-center items-center'>
            <InfoIcon size={28} />
            <p className='mb-2 text-neutral-400 text-wrap w-80'>
              Debes seleccionar una direccion de las sugerencias
            </p>
          </div>
          <Input
            autoComplete='off'
            placeholder='Direccion de envio'
            value={input}
            isInvalid={addressError}
            errorMessage={addressError && 'La direccion es requerida'}
            onChange={({ target: { value } }) => {
              setAddress(null)
              setInput(value)
              setLoading(true)
              setOpenAutoComplete(true)
              setPredictions([])
              handleChange(value)
            }}
          />
          {openAutoComplete && (
            <Card className='absolute z-50 rounded mt-2 w-full bg-neutral-800 transition-all'>
              <div>
                {loading && (
                  <div className='w-full my-2 flex justify-center items-center'>
                    <CircularProgress color='secondary' aria-label='Loading...' />
                  </div>
                )}
                {predictions.map((prediction: any, index: number) => (
                  <div
                    key={index}
                    onClick={() => handlePredictionClick(prediction)}
                    className='hover:bg-purple-950 transition-all py-5 flex items-center gap-3 px-5 cursor-pointer rounded'
                  >
                    <div>
                      <MapPin size={28} />
                    </div>
                    <p>{prediction.formatted_address}</p>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
        <Input
          placeholder='Informacion adicional'
          value={aditionalInfo}
          onChange={(e) => setAditionalInfo(e.target.value)}
        />
        <Input
          placeholder='Email'
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
        />
        <div className='flex gap-2'>
          <Input
            placeholder='Nombre'
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <Input
            placeholder='Número'
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </div>
        <Button
          color='secondary'
          type='submit'
          className='font-bold text-xl'
          isDisabled={buttonLoading}
        >
          Pedir domiciliario
        </Button>
      </form>
    </>
  )
}
