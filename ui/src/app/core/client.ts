import { ApolloClient, InMemoryCache } from '@apollo/client'

const backendUrl = import.meta.env.VITE_BACKEND_URL
export const client = new ApolloClient({
  uri: backendUrl,
  cache: new InMemoryCache(),
})
