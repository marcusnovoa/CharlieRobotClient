import React from "react";
import {StyleSheet, Text, View} from "react-native";
import { Input, Item, Button } from 'native-base';
import { serverURL } from '../env.json'
import Axios from 'axios'

// TODO deploy server to AWS and set up CI/CD
const api = Axios.create({
  baseURL: serverURL
})

function TestInput() {

  const [message, setMessage] = React.useState('')
  const [watsonRes, setWatsonRes] = React.useState('')

  return(
    <View>
      <View style={styles.enter}>
        <Item regular style={{width: "80%"}}>
          <Input placeholder='Regular Textbox' onChangeText={(e) => {
            setMessage(e)
          }}/>
        </Item>
        <Button onPress={() => {
          api.post('/talk', {
            text: message
          })
            .then((res) => {
              setWatsonRes(res.data)
            }, (err) => {
              console.log(err)
            })
        }}>
          <Text>Enter</Text>
        </Button>
      </View>
      {watsonRes !== '' ? <Text>{watsonRes}</Text> : <View />}
    </View>
)};

const styles = StyleSheet.create({
  enter: {
    width: '80%',
    flexDirection: "row"
  }
})

export default TestInput;