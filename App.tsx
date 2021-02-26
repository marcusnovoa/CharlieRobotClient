import React, { useEffect, useState } from 'react'
import { StatusBar, StyleSheet, View } from 'react-native'
import * as Font from 'expo-font'
import { Ionicons } from '@expo/vector-icons'
import { Container } from 'native-base'
import Home from './components/Home'
import Loading from './components/Loading'
import NavigationControl from './components/NavigationControl'
import Training from './components/Training'
// import TestInput from './components/TestInput'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()

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
    <Container style={styles.container}>
      {!isReady ? (
        <Loading />
      ) : (
        <NavigationContainer>
          <StatusBar
            translucent
            backgroundColor='transparent'
            barStyle='light-content' />
          <View style={styles.innerContainer}>
            <Stack.Navigator initialRouteName='Home'>
              <Stack.Screen name='Home'
                component={Home}
                options={{
                  headerShown: false,
                  cardStyle: {backgroundColor: 'transparent'} }} />
              <Stack.Screen name='NavigationControl'
                component={NavigationControl}
                options={{
                  headerShown: false,
                  cardStyle: {backgroundColor: 'transparent'} }} />
              <Stack.Screen name='Training'
                component={Training}
                options={{
                  headerShown: false,
                  cardStyle: {backgroundColor: 'transparent'} }} />
              {/* <Stack.Screen name='TestInput'
                component={TestInput}
                options={{
                  headerShown: false,
                  cardStyle: {backgroundColor: 'transparent'} }} /> */}
            </Stack.Navigator>
          </View>
        </NavigationContainer>
      )}
    </Container>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#004785',
  },
  innerContainer: {
    flex: 1,
    width: '100%'
  },
})

export default App
