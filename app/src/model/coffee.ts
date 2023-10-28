import type { UUID } from 'crypto'

export interface Coffee {
  id: UUID
  title: string
  ingredients: string[]
}
