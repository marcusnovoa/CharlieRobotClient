import React from 'react'
import { View } from 'react-native'

export interface Props {
  children: any
}

const ScreenContainer: React.FC<Props> = ({ children }) => (
  <View style={{ flex: 1, marginLeft: '5%', width: '90%' }}>
    {children}
  </View>
)

export default ScreenContainer
