import React from 'react'
import { Text } from 'native-base'
import ScreenContainer from './containers/ScreenContainer'
import Spacing from './styles/Spacing'

const NavigationControl: React.FC = () => (
  <ScreenContainer>
    <Spacing top={80} />
    <Text style={{ color: '#fff' }}>
      Navigation Control
    </Text>
  </ScreenContainer>
)

export default NavigationControl
