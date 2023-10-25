import { CoffeeContext } from './CoffeeManager'
import { useContext } from 'react'

export const PredefinedCoffees = () => {
  const { coffees } = useContext(CoffeeContext)
  return (
    <>
      {coffees.map(({ title, ingredients, id }) => (
        <div key={id}>
          {title}, {ingredients}
        </div>
      ))}
    </>
  )
}
