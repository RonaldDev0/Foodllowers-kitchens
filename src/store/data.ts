import { create } from 'zustand'

interface State {
  user: any
  order: {
    product: {
      productName: string
      description: string
      price: number
    }
  } | null
}

interface Actions {
  setStore: (property: keyof State, value: any) => void
}

export const useData = create<State & Actions>(set => ({
  user: null,
  order: null,
  setStore: (property, value) => set(prev => ({ ...prev, [property]: value }))
}))
