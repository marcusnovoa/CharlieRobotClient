import React from 'react'
import { Button, Content, Text } from 'native-base'
import BadgeMessage from './common/BadgeMessage'

const Home: React.FC = () => (
  <Content>
    <BadgeMessage success text='Robot Microphone Connected' />
    <BadgeMessage success={false} text='Robot Speaker Connected' />
    <BadgeMessage success={false} text='IBM Watson Connected' />
    <Button light full>
      <Text>Navigation Control</Text>
    </Button>
    <Button light full>
      <Text>Watson Assistant Training</Text>
    </Button>
    <Button light full>
      <Text>Power On</Text>
    </Button>
  </Content>
)

export default Home
