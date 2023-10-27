export const typeDefs = `#graphql
type Coffee {
  id: String
  title: String
  ingredients: [String]
}

type Query {
  coffees: [Coffee]
  externalCoffees: [Coffee]
}
`
