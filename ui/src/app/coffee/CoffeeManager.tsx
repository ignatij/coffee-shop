import { useQuery } from '@apollo/client'
import React, {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useState,
} from 'react'
import { Coffee, getCoffeeQuery, getExternalCoffeeQuery } from './coffee'

export type CoffeeContextType = {
  coffees: Coffee[]
  order: Coffee | undefined
  setOrder: Dispatch<SetStateAction<Coffee | undefined>>
  externalCoffees: Coffee[]
  ingredients: string[]
}

export const CoffeeContext = React.createContext({} as CoffeeContextType)

export const CoffeeManager = ({ children }: PropsWithChildren) => {
  const [order, setOrder] = useState<Coffee>()
  const coffeeQueryResult = useQuery(getCoffeeQuery)
  const externalCoffeeQueryResult = useQuery(getExternalCoffeeQuery)
  if (coffeeQueryResult.error || externalCoffeeQueryResult.error) {
    console.error(
      'Error with Apollo client',
      coffeeQueryResult.error || externalCoffeeQueryResult.error,
    )
    throw new Error('Error while fetching list of coffees')
  }

  const setIngredientsFromExternalCoffees = (coffees: Coffee[]): string[] => {
    const ingredients = new Set(coffees.flatMap((c: Coffee) => c.ingredients))
    return [...ingredients]
  }

  /**
 * the REST way, we would have the following functions
 * 
 *   
 *
 * const http = useContext(HttpContext)
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
      setIngredientsFromExternalCoffes(data)
    } catch (e) {
      console.error('Error while trying to fetch external coffees', e)
    }
  }

  useEffect(() => {
  fetchCoffees()
  fetchExternalCoffees()
  fetchCoffeesGraphql()
  fetchExternalCoffeesGraphql()
  }, [])
 * 
 * 
 */

  return (
    !(coffeeQueryResult.loading || externalCoffeeQueryResult.loading) &&
    coffeeQueryResult.data &&
    externalCoffeeQueryResult.data && (
      <CoffeeContext.Provider
        value={{
          coffees: coffeeQueryResult.data.coffees,
          order,
          setOrder,
          externalCoffees: externalCoffeeQueryResult.data.externalCoffees,
          ingredients: setIngredientsFromExternalCoffees(
            externalCoffeeQueryResult.data.externalCoffees,
          ),
        }}
      >
        {children}
      </CoffeeContext.Provider>
    )
  )
}
