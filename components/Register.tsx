import React from "react";
import { StyleSheet, Text, View } from "react-native"
import { Input, Item, Button, Toast } from 'native-base';
import ScreenContainer from "./containers/ScreenContainer";
import UNHBanner from "./UNHBanner";
import Spacing from "./styles/Spacing";
// TODO create a declaration file or type for firebase or change config file to Typescript
import { firebase } from "../src/firebase/config"

const placeholderColor = "#a8a8a8"

function Register({navigation}: any) {

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [confirmPassword, setConfirmPassword] = React.useState('')

  return (
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
        <Item regular>
          <Input style={styles.input} secureTextEntry={true} placeholderTextColor={placeholderColor} placeholder={"Confirm Password"}
                 onChangeText={(e) => { setConfirmPassword(e) }}
          />
        </Item>
        <Spacing bottom={10} />
        <Button light full style={{backgroundColor: '#fff'}} onPress={() => {
          if(password === confirmPassword && password.length >= 6) {
            firebase.auth().createUserWithEmailAndPassword(email, password)
              .then((response: any) => {
                navigation.navigate('Home')
              })
              .catch((error: any) => {
                console.log(error)
                // TODO styling for error can be done better
                Toast.show({
                  text: "ERROR try again",
                  duration: 4000,
                  style: {backgroundColor: "red"}
                })
              })
          } else {
            if(password.length < 6) {
              Toast.show({
                text: "Password needs to be length of 6",
                duration: 4000,
                style: {backgroundColor: "red"}
              })
            } else {
              Toast.show({
                text: "Passwords don't match",
                duration: 4000,
                style: {backgroundColor: "red"}
              })
            }
          }
        }}>
          <Text>Register</Text>
        </Button>
      </View>
      <Spacing bottom={10} />
      <Text
        style={{
          textAlign: "center",
          color: placeholderColor
        }}
        onPress={() => {
          navigation.navigate('Login')
        }}
      >
        Already have an account? Login here.
      </Text>
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  input: {
    color: "#fff"
  }
})

export default Register