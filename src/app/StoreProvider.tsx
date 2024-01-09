'use client'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore } from './redux/store'
import counterReducer from './redux/categories/slices/Slices';

export default function StoreProvider({
  count,
  children,
}: {
  count: number,
  children: React.ReactNode
}) {
  const storeRef = useRef<AppStore>()
  if (!storeRef.current) {
      storeRef.current = makeStore()
      storeRef.current.dispatch(counterReducer(count))
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}