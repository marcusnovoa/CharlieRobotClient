import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Spinner, Text } from 'native-base'

const Loading: React.FC = () => (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Spinner color='#fff' />
      <Text style={styles.text}>App Loading...</Text>
    </View>
)

const styles = StyleSheet.create({
  text: {
    color: '#fff'
  }
})

export default Loading
