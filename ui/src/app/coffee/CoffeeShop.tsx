import { styled } from '@mui/joy'
import { useState } from 'react'
import { CoffeeManager } from './CoffeeManager'
import { DecorateCoffeeSelector } from './DecorateCoffeeSelector'
import { ExternalCoffeesSelector } from './ExternalCoffeesSelector'
import { PlacedOrders } from './PlacedOrders'
import { PredefinedCoffeesSelector } from './PredefinedCoffeesSelector'
import { PreviewCoffeeOrder } from './PreviewCoffeeOrder'
import { Coffee } from './coffee'

const Container = styled('div')({
  maxWidth: '1536px',
  marginLeft: 'auto',
  marginRight: 'auto',
  minHeight: '100vh',
  display: 'flex',
})

const InnerContainer = styled('div')({
  display: 'flex',
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '30px',
})

const LeftContainer = styled('div')({
  flexBasis: '66.666667%',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
})

const RightContainer = styled('div')({
  flexBasis: '33.333333%',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
})

export const CoffeeShop = () => {
  const [predefinedValue, setPredefinedValue] = useState<Coffee | null>()
  const [externalValue, setExternalValue] = useState<Coffee | null>()
  return (
    <Container>
      <CoffeeManager>
        <InnerContainer>
          <LeftContainer>
            <PredefinedCoffeesSelector
              value={predefinedValue}
              setValue={setPredefinedValue}
              resetFn={setExternalValue}
            />
            <ExternalCoffeesSelector
              value={externalValue}
              setValue={setExternalValue}
              resetFn={setPredefinedValue}
            />
          </LeftContainer>
          <RightContainer>
            <DecorateCoffeeSelector />
            <PreviewCoffeeOrder />
            <PlacedOrders />
          </RightContainer>
        </InnerContainer>
      </CoffeeManager>
    </Container>
  )
}
