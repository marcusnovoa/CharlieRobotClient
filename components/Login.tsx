import React from "react";
import { StyleSheet, Text, View } from "react-native"
import { Input, Item, Button } from 'native-base';
import ScreenContainer from "./containers/ScreenContainer";
import UNHBanner from "./UNHBanner";
import Spacing from "./styles/Spacing";

function Login({navigation}: any) {
  return(
    <ScreenContainer>
      <Spacing bottom={50} />
      <UNHBanner />
      <View style={{flexDirection: "column"}}>
        <Item regular>
          <Input style={styles.input} placeholder={"Username"}/>
        </Item>
        <Spacing bottom={20} />
        <Item regular>
          <Input style={styles.input} secureTextEntry={true} placeholder={"Password"}/>
        </Item>
        <Spacing bottom={20} />
        {/* TODO make a login call to the server */}
        <Button light full style={{backgroundColor: '#fff'}} onPress={() => {
          navigation.navigate('Home')
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