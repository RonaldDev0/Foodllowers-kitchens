'use client'
import { useState } from 'react'
import { Select, SelectItem, Input, Button } from '@nextui-org/react'
import { useData } from '@/store'
import { useSupabase } from '@/app/providers'

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

export function BankAccount ({ onClose }: { onClose: any }) {
  const { kitchenId, kitchen, setStore } = useData()
  const { supabase } = useSupabase()

  const [bank, setBank] = useState<any>(kitchen ? kitchen?.bank_account?.bank : null)
  const [bankError, setBankError] = useState<any>(null)
  const [bankNumber, setBankNumber] = useState<string>(kitchen ? kitchen?.bank_account?.bankNumber : '')
  const [bankNumberError, setBankNumberError] = useState<any>(null)

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
    if (bankNumber.length < 9 || bankNumber.length > 20) {
      setBankNumberError('Cuenta de banco invalida')
      return
    }

    supabase
      .from('kitchens')
      .update({ bank_account: { bank, bankNumber } })
      .eq('id', kitchenId)
      .select('*')
      .then(({ error, data }) => {
        if (error) {
          return
        }
        setStore('kitchen', data[0])
        onClose()
      })

    onClose()
  }

  return (
    <div className='flex flex-col gap-5'>
      <p>Para procesar los pagos de tus ventas, necesitamos los datos de tu cuenta bancaria. Asegúrate de ingresar la información correctamente para evitar inconvenientes en las transacciones. Este paso es esencial para garantizar que recibas tus ganancias de manera segura y puntual.</p>
      <p>Asegurarse de que esta cuenta sea suya, no nos hacemos responsables de cualquier pérdida o daño que pudiese sufrir.</p>
      <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
        <Select
          label='Selecciona tu cuenta de banco'
          onChange={handleChangeSelect}
          errorMessage={bankError && bankError}
          isInvalid={!!bankError}
          defaultSelectedKeys={[bank]}
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
    </div>
  )
}
