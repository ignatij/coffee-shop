import { HttpManager } from './core/HttpManager'
import { CoffeeShop } from './coffee/CoffeeShop'

function App() {
  return (
    <>
      <HttpManager>
        <CoffeeShop />
      </HttpManager>
    </>
  )
}

export default App
