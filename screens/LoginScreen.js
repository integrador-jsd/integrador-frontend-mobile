import React from 'react';
import {
  View, Text, StyleSheet,
} from 'react-native';

export default class LoginScreen extends React.Component {

  render() {
    return(
      <View style = {styles.container}>
      </View>
    );
  }
}

LoginScreen.navigationOptions = {
  header: null,
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#rgb(255,255,255)',
  },
});
