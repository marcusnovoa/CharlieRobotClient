import React from 'react'
import { Text } from 'native-base'
import ScreenContainer from './containers/ScreenContainer'
import Spacing from './styles/Spacing'

const Training: React.FC = () => (
  <ScreenContainer>
    <Spacing top={80} />
    <Text style={{ color: '#fff' }}>
      Training
    </Text>
  </ScreenContainer>
)

export default Training
