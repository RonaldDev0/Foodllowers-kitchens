import { create } from 'zustand'

interface State {
  user: any
  orders: any
}

interface Actions {
  setStore: (property: keyof State, value: any) => void
}

export const useData = create<State & Actions>(set => ({
  user: null,
  orders: null,
  setStore: (property, value) => set(prev => ({ ...prev, [property]: value }))
}))
