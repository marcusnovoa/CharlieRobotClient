import React from "react";
import { StyleSheet, Text, View } from "react-native"
import { Input, Item, Button, Toast } from 'native-base';
import ScreenContainer from "./containers/ScreenContainer";
import UNHBanner from "./UNHBanner";
import Spacing from "./styles/Spacing";
// TODO create a declaration file or type for firebase or change config file to Typescript
import { firebase } from "../src/firebase/config"

const placeholderColor = "#a8a8a8"

function Login({navigation}: any) {

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  return(
    <ScreenContainer>
      <Spacing bottom={50} />
      <UNHBanner />
      <View style={{flexDirection: "column"}}>
        <Item regular>
          <Input style={styles.input} placeholder={"Username"} placeholderTextColor={placeholderColor} keyboardType={"email-address"}
                 onChangeText={(e) => { setEmail(e) }}
          />
        </Item>
        <Spacing bottom={20} />
        <Item regular>
          <Input style={styles.input} secureTextEntry={true} placeholderTextColor={placeholderColor} placeholder={"Password"}
                 onChangeText={(e) => { setPassword(e) }}
          />
        </Item>
        <Spacing bottom={20} />
        {/* TODO make a login call to the server */}
        <Button light full style={{backgroundColor: '#fff'}} onPress={() => {
          firebase.auth().signInWithEmailAndPassword(email, password)
            .then((response: any) => {
              //console.log(response)
              // TODO user info is sent back from google, maybe use that later
              navigation.navigate('Home')
            })
            .catch((error: any) => {
              console.log(error)
              // TODO styling for error can be done better
              Toast.show({
                text: "Email or password is wrong",
                duration: 4000,
                style: {backgroundColor: "red"}
              })
            })
        }}>
          <Text>Login</Text>
        </Button>
      </View>
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  input: {
    color: "#fff"
  }
})

export default Login;