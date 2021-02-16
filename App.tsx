import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const App: React.FC = () => (
  <View style={styles.container}>
    <Image
      style={styles.logo}
      source={require('./assets/img/unh_logo_white.png')} />
    <View style={styles.horizontal} />
    <Text style={styles.text}>Admissions Robot</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#004785',
    alignItems: 'center',
    justifyContent: 'center',
  },
  horizontal: {
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    marginBottom: 18,
    width: '70%'
  },
  logo: {
    height: '8%',
    marginBottom: 24,
    resizeMode: 'contain'
  },
  text: {
    color: '#fff',
    fontSize: 24
  }
});

export default App;
