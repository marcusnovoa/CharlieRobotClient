import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { Text } from 'native-base'

const UNHBanner: React.FC = () => (
  <View style={styles.container}>
    <Image
      style={styles.logo}
      source={require('../assets/img/unh_logo_white.png')} />
    <View style={styles.horizontal} />
    <Text style={styles.text}>Charlie Virtual Assistant</Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingBottom: 40
  },
  horizontal: {
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    marginBottom: 18,
    width: '70%'
  },
  logo: {
    height: 65,
    width: '100%',
    marginBottom: 24,
    resizeMode: 'contain'
  },
  text: {
    color: '#fff'
  }
})

export default UNHBanner
