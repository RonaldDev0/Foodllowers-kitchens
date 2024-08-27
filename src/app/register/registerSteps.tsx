import { Smartphone, Landmark, Store, HeartPulse } from 'lucide-react'
import { ChamberOfCommerce, Health, BankAccount } from './Components'
import { PhoneNumber } from './Components/PhoneNumber'

export interface IStep {
  icon: any
  title: string
  component: any
  tableReference: string
}

const size = 40

export const registerSteps: IStep[] = [
  {
    icon: <Smartphone size={size} />,
    title: 'Número de celular',
    component: <PhoneNumber onClose={() => {}} />,
    tableReference: 'phone_number'
  },
  {
    icon: <Store size={size} />,
    title: 'Camara de comercio',
    component: <ChamberOfCommerce onClose={() => {}} />,
    tableReference: 'chamber_of_commerce'
  },
  {
    icon: <HeartPulse size={size} />,
    title: 'Sanidad',
    component: <Health onClose={() => {}} />,
    tableReference: 'health'
  },
  {
    icon: <Landmark size={size} />,
    title: 'Cuenta Bancaria',
    component: <BankAccount onClose={() => {}} />,
    tableReference: 'bank_account'
  }
]
