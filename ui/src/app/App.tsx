import { HttpManager } from './core/HttpManager'
import { CoffeeShop } from './coffee/CoffeeShop'
import { ApolloProvider } from '@apollo/client'
import { client } from './core/client'

function App() {
  return (
    <>
      <HttpManager>
        <ApolloProvider client={client}>
          <CoffeeShop />
        </ApolloProvider>
      </HttpManager>
    </>
  )
}

export default App
