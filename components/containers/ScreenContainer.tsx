import React from 'react'
import {SafeAreaView} from 'react-native'

export interface Props {
  children: any
}

const ScreenContainer: React.FC<Props> = ({ children }) => (
  <SafeAreaView style={{ flex: 1, marginLeft: '5%', width: '90%' }}>
    {children}
  </SafeAreaView>
)

export default ScreenContainer
