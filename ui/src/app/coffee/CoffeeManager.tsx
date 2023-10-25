import { HttpContext } from '../core/HttpManager'
import { Coffee } from './coffee'
import React, {
  PropsWithChildren,
  useContext,
  useState,
  useEffect,
} from 'react'
import { fetchCoffeesUrl } from '../core/backend-endpoints.ts'

export type CoffeeContextType = {
  coffees: Coffee[]
}

export const CoffeeContext = React.createContext({} as CoffeeContextType)

export const CoffeeManager = ({ children }: PropsWithChildren) => {
  const http = useContext(HttpContext)
  const [coffees, setCoffees] = useState<Coffee[]>([])

  const fetchCoffees = async () => {
    try {
      const { data } = await http.get<Coffee[]>(fetchCoffeesUrl)
      setCoffees(() => data)
    } catch (e) {
      console.error('Error while trying to fetch coffees', e)
    }
  }

  useEffect(() => {
    fetchCoffees()
  }, [])

  return (
    <CoffeeContext.Provider value={{ coffees }}>
      {children}
    </CoffeeContext.Provider>
  )
}
