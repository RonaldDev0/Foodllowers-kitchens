import { create } from 'zustand'

export interface order {
  transaction_amount: {
    kitchen: number
  }
  preferences: any
  id: any
  invoice_id: string
  payment_status: string
  product: {
    influencers: {
      avatar: string | undefined
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
  soundAlert: boolean
  toastDelivery: boolean
  darkMode: boolean
  balanceFetched: boolean
  balance: number
  balanceHistory: {
    id: string
    created_at: string
    amount: number
  }[]
  products: any
  kitchenId: any
  kitchen: any
  ActivationCode: string | null
  kitchenAddress: any
  user: any
  active: boolean | null
  shipments: {
    id: any
    product: any
  } | null
  currentOrders: order[] | null
  orders: order[]
  pendingDeliveryAssignmentOrders: any[],
  kitchenToken: any
}

interface Actions {
  setStore: (property: keyof State, value: any) => void
  addOrder: (newOrder: order) => void
  deleteOrder: (orderId: any) => void
}

export const useData = create<State & Actions>(set => ({
  soundAlert: false,
  toastDelivery: false,
  darkMode: typeof window !== 'undefined' && JSON.parse(localStorage.getItem('darkMode') || 'true'),
  balanceFetched: false,
  balance: 0,
  balanceHistory: [],
  products: null,
  kitchenId: null,
  kitchen: null,
  ActivationCode: null,
  kitchenAddress: null,
  user: null,
  active: null,
  shipments: null,
  currentOrders: [],
  orders: [],
  pendingDeliveryAssignmentOrders: [],
  kitchenToken: null,
  setStore: (property, value) => set(prev => ({ ...prev, [property]: value })),
  addOrder: (newOrder) => set(state => ({ orders: [...state.orders, newOrder] })),
  deleteOrder: (orderId) => set(state => ({ orders: state.orders.filter(order => order.id !== orderId) }))
}))
