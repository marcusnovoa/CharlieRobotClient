import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { Button, Content, Text } from 'native-base'
import BadgeMessage from './common/BadgeMessage'
import Spacing from './styles/Spacing';

const Home: React.FC = () => {

  const [poweredOn, setPoweredOn] = useState(false)

  const powerOn = () => setPoweredOn(!poweredOn)
  
  return (
    <Content>
      <BadgeMessage success text='Robot Microphone Connected' />
      <Spacing bottom={40} />
      <BadgeMessage success={false} text='Robot Speaker Connected' />
      <Spacing bottom={40} />
      <BadgeMessage success={false} text='IBM Watson Connected' />
      <Spacing bottom={40} />
      <Button
        disabled={!poweredOn} full light
        style={poweredOn ? styles.lightButton : null}>
        <Text>
          Navigation Control
        </Text>
      </Button>
      <Spacing bottom={40} />
      <Button
        disabled={!poweredOn} full light
        style={poweredOn ? styles.lightButton : null}>
        <Text>
          Watson Assistant Training
        </Text>
      </Button>
      <Spacing bottom={40} />
      <Button
        full light onPress={() => powerOn()}
        style={styles.lightButton}>
        <Text>
          {!poweredOn ? 'Power On' : 'Power Off'}
        </Text>
      </Button>
    </Content>
  )
}

const styles = StyleSheet.create({
  lightButton: {
    backgroundColor: '#f8f8f8'
  }
})

export default Home
