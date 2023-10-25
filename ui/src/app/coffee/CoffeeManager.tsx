import { HttpContext } from '../core/HttpManager'
import { Coffee } from './coffee'
import React, {
  PropsWithChildren,
  useContext,
  useState,
  useEffect,
} from 'react'
import { fetchCoffeesUrl, fetchExternalCoffeesUrl } from '../core/backend-endpoints.ts'

export type CoffeeContextType = {
  coffees: Coffee[]
  order: Coffee | undefined
  setOrder: (prevVal: Coffee) => Coffee
  externalCoffees: Coffee[]
}

export const CoffeeContext = React.createContext({} as CoffeeContextType)

export const CoffeeManager = ({ children }: PropsWithChildren) => {
  const http = useContext(HttpContext)
  const [coffees, setCoffees] = useState<Coffee[]>([])
  const [externalCoffees, setExternalCoffees] = useState<Coffee[]>([])
  const [order, setOrder] = useState<Coffee>()

  const fetchCoffees = async () => {
    try {
      const { data } = await http.get<Coffee[]>(fetchCoffeesUrl)
      setCoffees(() => data)
    } catch (e) {
      console.error('Error while trying to fetch coffees', e)
    }
  }

  const fetchExternalCoffees = async () => {
    try {
      const { data } = await http.get<Coffee[]>(fetchExternalCoffeesUrl)
      setExternalCoffees(() => data)
    } catch (e) {
      console.error('Error while trying to fetch external coffees', e)
    }
  }

  useEffect(() => {
    fetchCoffees()
    fetchExternalCoffees()
  }, [])

  return (
    <CoffeeContext.Provider value={{ coffees, order, setOrder, externalCoffees }}>
      {children}
    </CoffeeContext.Provider>
  )
}
