'use client'
import { useSupabase } from '@/app/providers'
import { useState, FC } from 'react'
import { Card, CardHeader, CardBody, Select, SelectItem, Input, Button } from '@nextui-org/react'
import { Landmark } from 'lucide-react'
import { useData } from '@/store'
import { banks } from './banks'

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

export default function BankAccount () {
  const { kitchen, kitchenId, setStore } = useData()
  const { supabase } = useSupabase()

  const [accountType, setAccountType] = useState<any>(kitchen ? kitchen?.bank_account?.accountType : '')
  const [accountTypeError, setAccountTypeError] = useState<any>(null)

  const [bank, setBank] = useState<any>(kitchen ? kitchen?.bank_account?.bank : null)
  const [bankError, setBankError] = useState<any>(null)

  const [bankNumber, setBankNumber] = useState<string>(kitchen ? kitchen?.bank_account?.bankNumber : '')
  const [bankNumberError, setBankNumberError] = useState<any>(null)

  const [ownerName, setOwnerName] = useState<string>(kitchen ? kitchen?.bank_account?.ownerName : '')
  const [ownerNameError, setOwnerNameError] = useState<any>(null)

  const [ownerDocumentType, setOwnerDocumentType] = useState<any>(kitchen ? kitchen?.bank_account?.ownerDocumentType : '')
  const [ownerDocumentTypeError, setOwnerDocumentTypeError] = useState<any>(null)

  const [ownerDocumentNumber, setOwnerDocumentNumber] = useState<string>(kitchen ? kitchen?.bank_account?.ownerDocumentNumber : '')
  const [ownerDocumentNumberError, setOwnerDocumentNumberError] = useState<any>(null)

  const [toastVisible, setToastVisible] = useState(false)

  function showToast () {
    setToastVisible(true)
    setTimeout(() => {
      setToastVisible(false)
    }, 3000)
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()

    if (!accountType) {
      setAccountTypeError('Selecciona tu tipo de cuenta')
      return
    } else if (!bank) {
      setBankError('Selecciona tu banco')
      return
    } else if (bankNumber.length < 9 || bankNumber.length > 20) {
      setBankNumberError('Cuenta de banco invalida')
      return
    } else if (!ownerName) {
      setOwnerNameError('Ingresa tu nombre')
      return
    } else if (!ownerDocumentType) {
      setOwnerDocumentTypeError('Selecciona tu tipo de documento')
      return
    } else if (ownerDocumentNumber.length < 9 || ownerDocumentNumber.length > 20) {
      setOwnerDocumentNumberError('Documento de propietario invalida')
      return
    }

    supabase
      .from('kitchens')
      .update({ bank_account: { accountType, bank, bankNumber, ownerName, ownerDocumentType, ownerDocumentNumber } })
      .eq('id', kitchenId)
      .select('*')
      .then(res => {
        if (res.error) return

        setStore('kitchen', res.data[0])
        showToast()
      })
  }

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
            label='Selecciona tu tipo de cuenta'
            onChange={(e: any) => {
              setAccountType(e.target.value)
              setAccountTypeError(null)
            }}
            defaultSelectedKeys={[accountType]}
            errorMessage={accountTypeError && accountTypeError}
            isInvalid={!!accountTypeError}
          >
            <SelectItem value='1' key='1'>
              Ahorros
            </SelectItem>
            <SelectItem value='2' key='2'>
              Corriente
            </SelectItem>
            <SelectItem value='3' key='3'>
              Deposito electrónico
            </SelectItem>
          </Select>
          <Select
            label='Selecciona tu entidad bancaria'
            onChange={(e: any) => {
              setBank(e.target.value)
              setBankError(null)
            }}
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
            onChange={(e: any) => {
              setBankNumber(e.target.value)
              setBankNumberError(null)
            }}
            errorMessage={bankNumberError && bankNumberError}
            isInvalid={!!bankNumberError}
          />
          <Input
            label='Nombre del propietario'
            type='text'
            value={ownerName}
            onChange={(e: any) => {
              setOwnerName(e.target.value)
              setOwnerNameError(null)
            }}
            errorMessage={ownerNameError && ownerNameError}
            isInvalid={!!ownerNameError}
          />
          <Select
            label='Selecciona tu tipo de documento'
            onChange={(e: any) => {
              setOwnerDocumentType(e.target.value)
              setOwnerDocumentTypeError(null)
            }}
            defaultSelectedKeys={[ownerDocumentType]}
            errorMessage={ownerDocumentTypeError && ownerDocumentTypeError}
            isInvalid={!!ownerDocumentTypeError}
          >
            <SelectItem value='1' key='1'>
              Cédula de ciudadanía
            </SelectItem>
            <SelectItem value='2' key='2'>
              Cédula de extranjería
            </SelectItem>
            <SelectItem value='3' key='3'>
              NIT
            </SelectItem>
            <SelectItem value='6' key='6'>
              Pasaporte
            </SelectItem>
          </Select>
          <Input
            label='Número de documento del propietario'
            type='number'
            value={(ownerDocumentNumber)}
            onChange={(e: any) => {
              setOwnerDocumentNumber(e.target.value)
              setOwnerDocumentNumberError(null)
            }}
            errorMessage={ownerDocumentNumberError && ownerDocumentNumberError}
            isInvalid={!!ownerDocumentNumberError}
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
