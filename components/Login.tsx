import React from "react";
import { StyleSheet, Text, View, AsyncStorage } from "react-native"
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

  const storeSession = async (uuid: string) => {
    try {
      await AsyncStorage.setItem(
        "id", uuid
      )
    } catch (e) {
      console.log(e.toString())
    }
  }

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
              // TODO Need to create log out component to clear local session
              storeSession(response.user.uid)
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
      <Spacing bottom={10} />
      <Text
        style={{
          textAlign: "center",
          color: placeholderColor
        }}
        onPress={() => {
          navigation.navigate('Register')
        }}
      >
        Don't have an account? Register here.
      </Text>
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  input: {
    color: "#fff"
  }
})

export default Login;