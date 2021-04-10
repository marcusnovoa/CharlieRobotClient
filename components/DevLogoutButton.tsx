import React from 'react'
import {AsyncStorage, Text} from "react-native";
import { Button } from "native-base";

function DevLogoutButton({navigation}: any) {

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("id")
      navigation.navigate("Login")
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Button light full onPress={logout}>
      <Text>Dev Logout</Text>
    </Button>
  )
}

export default DevLogoutButton