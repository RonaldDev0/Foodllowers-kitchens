import { create } from 'zustand'

interface State {
  products: any
  kitchenId: any
  user: any
  active: boolean | null
  shipments: {
    id: any
    product: any
  } | null
  order: {
    id: any
    product: {
      preview: string
      name: string
      description: string
      price: number
    }
  } | null
}

interface Actions {
  setStore: (property: keyof State, value: any) => void
}

export const useData = create<State & Actions>(set => ({
  products: null,
  kitchenId: null,
  user: null,
  active: null,
  shipments: null,
  order: null,
  setStore: (property, value) => set(prev => ({ ...prev, [property]: value }))
}))
