import React, { useEffect, useState } from 'react'
import { StatusBar, StyleSheet } from 'react-native'
import * as Font from 'expo-font'
import { Ionicons } from '@expo/vector-icons'
import { Container, Root } from 'native-base'
import Home from './components/Home'
import Loading from './components/Loading'
import NavigationControl from './components/NavigationControl'
import Training from './components/Training'
import Login from './components/Login'
import Register from './components/Register'
// import TestInput from './components/TestInput'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()
const backgroundColor = '#004785'

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
    // Added Root for Toast within Login.tsx
    <Root>
      <Container style={styles.container}>
        {!isReady ? (
          <Loading />
        ) : (
          <NavigationContainer>
            <StatusBar
              translucent
              backgroundColor={backgroundColor}
              barStyle='light-content' />
            <Stack.Navigator initialRouteName='Login'>
              <Stack.Screen name='Home'
                component={Home}
                options={{
                  headerShown: false,
                  cardStyle: {backgroundColor: backgroundColor} }} />
              <Stack.Screen name='NavigationControl'
                component={NavigationControl}
                options={{
                  headerShown: false,
                  cardStyle: {backgroundColor: backgroundColor} }} />
              <Stack.Screen name='Training'
                component={Training}
                options={{
                  headerShown: false,
                  cardStyle: {backgroundColor: backgroundColor} }} />
              <Stack.Screen name='Login'
                component={Login}
                options={{
                  headerShown: false,
                  cardStyle: {backgroundColor: backgroundColor} }} />
              <Stack.Screen name='Register'
                component={Register}
                options={{
                  headerShown: false,
                  cardStyle: {backgroundColor: backgroundColor} }} />
              {/* <Stack.Screen name='TestInput'
                component={TestInput}
                options={{
                  headerShown: false,
                  cardStyle: {backgroundColor: 'transparent'} }} /> */}
            </Stack.Navigator>
          </NavigationContainer>
        )}
      </Container>
    </Root>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#004785',
  }
})

export default App
