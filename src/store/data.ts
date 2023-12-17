import { create } from 'zustand'

export interface order {
  id: any
  product: {
    influencers: {
      full_name: string
      preview: string
    }
    preview: string
    name: string
    description: string
    price: number
  }
}

interface State {
  products: any
  kitchenId: any
  user: any
  active: boolean | null
  shipments: {
    id: any
    product: any
  } | null
  orders: order[]
}

interface Actions {
  setStore: (property: keyof State, value: any) => void
  addOrder: (newOrder: order) => void
}

export const useData = create<State & Actions>(set => ({
  products: null,
  kitchenId: null,
  user: null,
  active: null,
  shipments: null,
  orders: [],
  setStore: (property, value) => set(prev => ({ ...prev, [property]: value })),
  addOrder: (newOrder) => set(state => ({ orders: [...state.orders, newOrder] }))
}))
