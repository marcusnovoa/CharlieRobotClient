import React from 'react'
import { Button, Content, Text } from 'native-base'
import BadgeMessage from './common/BadgeMessage'
import Spacing from './styles/Spacing';

const Home: React.FC = () => (
  <Content>
    <BadgeMessage success text='Robot Microphone Connected' />
    <Spacing bottom={40} />
    <BadgeMessage success={false} text='Robot Speaker Connected' />
    <Spacing bottom={40} />
    <BadgeMessage success={false} text='IBM Watson Connected' />
    <Spacing bottom={40} />
    <Button light full>
      <Text>Navigation Control</Text>
    </Button>
    <Spacing bottom={40} />
    <Button light full>
      <Text>Watson Assistant Training</Text>
    </Button>
    <Spacing bottom={40} />
    <Button light full>
      <Text>Power On</Text>
    </Button>
  </Content>
)

export default Home
