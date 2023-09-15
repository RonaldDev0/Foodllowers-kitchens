import { create } from 'zustand'

interface State {
  user: any
}

interface Actions {
  setStore: (property: keyof State, value: any) => void
}

export const useUser = create<State & Actions>(set => ({
  user: null,
  setStore: (property, value) => set(prev => ({ ...prev, [property]: value }))
}))
