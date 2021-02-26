import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Spinner, Text } from 'native-base'

const Loading: React.FC = () => (
    <View style={styles.container}>
      <Spinner color='#fff' style={styles.spinner}/>
      <Text style={styles.text}>App Loading...</Text>
    </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  spinner: {
    transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }]
  },
  text: {
    color: '#fff'
  }
})

export default Loading
