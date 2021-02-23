import React, { useEffect, useState } from 'react'
import { StatusBar, StyleSheet, View } from 'react-native'
import * as Font from 'expo-font'
import { Ionicons } from '@expo/vector-icons'
import { Container } from 'native-base'
import Home from './components/Home'
import Loading from './components/Loading'
import TestInput from './components/TestInput'
import UNHBanner from './components/UNHBanner'

const App: React.FC = () => {

  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({
        'Roboto': require('native-base/Fonts/Roboto.ttf'),
        'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
        ...Ionicons.font,
      })
      setIsReady(true)
    }
    // Load missing font family
    loadFont()
  }) // No variable array, run once
  
  return (
    <>
      <StatusBar
        translucent
        backgroundColor='transparent'
        barStyle='light-content' />
      <Container style={styles.container}>
        {!isReady ? (
          <Loading />
        ) : (
          <View style={styles.innerContainer}>
            <UNHBanner />
            {/* <Home /> */}
            <TestInput />
          </View>
        )}
      </Container>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#004785',
  },
  innerContainer: {
    flex: 1,
    width: '90%',
    paddingTop: 80
  },
})

export default App
