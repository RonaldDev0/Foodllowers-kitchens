'use client'
import { useSupabase } from '@/app/providers'
import { useState, useEffect, FC } from 'react'
import { Card, CardHeader, CardBody, Select, SelectItem, Input, Button } from '@nextui-org/react'
import { Landmark } from 'lucide-react'
import { useData } from '@/store'

interface ToastProps {
  message: string
  isVisible: boolean
  onClose: () => void
}

const Toast: FC<ToastProps> = ({ message, isVisible, onClose }) => {
  if (!isVisible) {
    return null
  }

  return (
    <div className='fixed bottom-0 right-0 m-6 animate-bounce'>
      <div className='bg-green-500 border-l-4 border-green-700 text-white px-4 py-2 shadow-md rounded-lg transform transition duration-500 ease-in-out hover:scale-105'>
        <div className='flex items-center justify-center gap-5'>
          <span className='font-bold'>{message}</span>
          <button onClick={onClose} className='text-2xl leading-none hover:text-gray-300'>&times;</button>
        </div>
      </div>
    </div>
  )
}

const banks = [
  {
    name: 'Bancolombia',
    value: 'Bancolombia'
  },
  {
    name: 'Banco Caja Social',
    value: 'Banco Caja Social'
  },
  {
    name: 'Banco Davivienda',
    value: 'Banco Davivienda'
  },
  {
    name: 'Banco de Bogotá',
    value: 'Banco de Bogotá'
  },
  {
    name: 'Banco de la República',
    value: 'Banco de la República'
  },
  {
    name: 'Banco de Occidente',
    value: 'Banco de Occidente'
  },
  {
    name: 'BBVA Colombia',
    value: 'BBVA Colombia'
  },
  {
    name: 'Banco Pichincha',
    value: 'Banco Pichincha'
  },
  {
    name: 'Banco Santander Colombia',
    value: 'Banco Santander Colombia'
  },
  {
    name: 'Financiera Comultrasan',
    value: 'Financiera Comultrasan'
  },
  {
    name: 'Itaú Corpbanca Colombia',
    value: 'Itaú Corpbanca Colombia'
  }
]

export default function BankAccount () {
  const { kitchen, kitchenId, setStore } = useData()
  const { supabase } = useSupabase()

  const [bank, setBank] = useState<any>(null)
  const [bankError, setBankError] = useState<any>(null)
  const [bankNumber, setBankNumber] = useState<string>('')
  const [bankNumberError, setBankNumberError] = useState<any>(null)
  const [toastVisible, setToastVisible] = useState(false)

  function showToast () {
    setToastVisible(true)
    setTimeout(() => {
      setToastVisible(false)
    }, 3000)
  }

  const handleChangeSelect = (e: any) => {
    setBank(e.target.value)
    setBankError(null)
  }

  const handleChangeInput = (e: any) => {
    setBankNumber(e.target.value)
    setBankNumberError(null)
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (!bank) {
      setBankError('Selecciona tu banco')
      return
    }
    if (bankNumber.length !== 20) {
      setBankNumberError('Cuenta de banco invalida')
      return
    }

    supabase
      .from('kitchens')
      .update({ bank_account: { bank, bankNumber } })
      .eq('id', kitchenId)
      .select('*')
      .then(res => {
        if (res.error) {
          return
        }
        setStore('kitchen', res.data[0])
        showToast()
      })
  }

  useEffect(() => {
    if (kitchen === null) {
      return
    }
    setBank(kitchen.bank_account.bank)
    setBankNumber(kitchen.bank_account.bankNumber)
  }, [kitchen])

  return (
    <Card className='w-96'>
      <Toast
        message='Cuenta de banco guardada!'
        isVisible={toastVisible}
        onClose={() => setToastVisible(false)}
      />
      <CardHeader className='justify-center font-semibold gap-3'>
        <div className='flex flex-col justify-center items-center gap-3'>
          <Landmark size={38} />
          <p className='text-xl'>Cuenta Bancaria</p>
        </div>
      </CardHeader>
      <CardBody>
        <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
          <Select
            selectedKeys={[bank]}
            label='Selecciona tu cuenta de banco'
            onChange={handleChangeSelect}
            errorMessage={bankError && bankError}
            isInvalid={!!bankError}
          >
            {banks.map(bank => (
              <SelectItem
                key={bank.value}
                value={bank.value}
              >
                {bank.name}
              </SelectItem>
            ))}
          </Select>
          <Input
            label='Número de cuenta'
            type='number'
            value={bankNumber}
            onChange={handleChangeInput}
            errorMessage={bankNumberError && bankNumberError}
            isInvalid={!!bankNumberError}
          />
          <Button
            type='submit'
            color='secondary'
            className='text-lg font-semibold mt-4'
          >
            Guardar
          </Button>
        </form>
      </CardBody>
    </Card>
  )
}
