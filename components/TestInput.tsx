import React from "react";
import { StyleSheet, Text, View } from 'react-native'
import { Input, Item, Button, Spinner } from 'native-base'
import { serverURL } from '../env.json'
import Axios from 'axios'
import ScreenContainer from './containers/ScreenContainer'
import Spacing from './styles/Spacing'

// TODO deploy server to AWS and set up CI/CD
const api = Axios.create({
  baseURL: serverURL
})

function TestInput() {

  const [message, setMessage] = React.useState('')
  const [watsonRes, setWatsonRes] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)

  return (
    <ScreenContainer>
      <View style={styles.enter}>
        <Item regular>
          <Input
            placeholder='Enter your intent...'
            style={styles.textBox}
            onChangeText={(e) => {
            setMessage(e)
          }}/>
        </Item>
        <Spacing bottom={20} />
        <Button light full onPress={() => {
          setIsLoading(true)
          api.post('/talk', {
            text: message
          })
            .then((res) => {
              setIsLoading(false)
              setWatsonRes(res.data)
            }, (err) => {
              setIsLoading(false)
              console.log(err)
            })
        }}>
          <Text>Enter</Text>
        </Button>
      </View>
      <Spacing bottom={20} />
      {isLoading && <Spinner />}
      {!isLoading && watsonRes !== '' && <Text style={styles.res}>{watsonRes}</Text>}
    </ScreenContainer>
)}

const styles = StyleSheet.create({
  enter: {
    flexDirection: 'column',
  },
  res: {
    color: '#fff',
    fontSize: 20
  },
  textBox: {
    color: '#fff',
  }
})

export default TestInput;