import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { Button, Content, Text } from 'native-base'
import BadgeMessage from './common/BadgeMessage'
import ScreenContainer from './containers/ScreenContainer'
import Spacing from './styles/Spacing'
import UNHBanner from '../components/UNHBanner'

export interface Props {
  navigation: any
}

const Home: React.FC<Props> = ({ navigation }) => {

  const [poweredOn, setPoweredOn] = useState(false)

  const powerOn = () => setPoweredOn(!poweredOn)
  
  return (
    <ScreenContainer>
      <Content>
        <Spacing top={80} />
        <UNHBanner />
        <BadgeMessage success text='Robot Microphone Connected' />
        <Spacing bottom={40} />
        <BadgeMessage success={false} text='Robot Speaker Connected' />
        <Spacing bottom={40} />
        <BadgeMessage success={false} text='IBM Watson Connected' />
        <Spacing bottom={40} />
        <Button
          disabled={!poweredOn} full light
          onPress={() => navigation.navigate('NavigationControl')}
          style={poweredOn ? styles.lightButton : null}>
          <Text>
            Navigation Control
          </Text>
        </Button>
        <Spacing bottom={40} />
        <Button
          disabled={!poweredOn} full light
          onPress={() => navigation.navigate('Training')}
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
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  lightButton: {
    backgroundColor: '#f8f8f8'
  }
})

export default Home
