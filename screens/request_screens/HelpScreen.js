import React, {Component} from 'react';
import { View, StyleSheet, Text, AsyncStorage} from 'react-native';

export default class HelpScreen extends Component<{}> {
  state = {
    user: [],
  }
  getUser = async () => {
    try {
      const value = await AsyncStorage.getItem('user');
      this.state.user =  JSON.parse(value);
    } catch (error) {
      console.log(error);
    }
  };
  render(){
    return (
      <View style={styles.container}>
        <Text> Aqui las pinchis solicitudes </Text>
      </View>
    );
  }
}
HelpScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(255,255,255)',
  },
  actionButtonIcon: {
    width: 33,
    height: 33
  },
});
