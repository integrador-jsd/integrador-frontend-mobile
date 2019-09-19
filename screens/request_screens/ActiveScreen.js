import React, {Component} from 'react';
import { View, StyleSheet, Text, Alert, Image, AsyncStorage} from 'react-native';
import ActionButton from 'react-native-action-button';
import FloatingButton from '../../components/FloatingButton';
import firebase from 'firebase';

export default class ActiveScreen extends Component<{}> {
  state = {
    user: [],
  }

  async componentDidMount(){
    await this.getUser();
    this.getUserRequest();
  }

  getUserRequest(){
    firebase.auth().currentUser.getIdToken(true).then(function(idToken) {
      var userName = this.state.user.data.username;
      const url = 'https://integrador-jsd-backend.herokuapp.com/api/v1/requests/'+userName;
      fetch(url, {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
          idToken: idToken,
        }),
      }).then((response) => response.json())
        .then((responseJson) => console.log(responseJson));
    }.bind(this));
  }

  getUser = async () => {
    try {
      const value = await AsyncStorage.getItem('user');
      if (value !== null) {
        this.state.user =  JSON.parse(value);
      }
    } catch (error) {
      console.log(error);
    }
  };

  render(){
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text onPress={this.getUserRequest.bind(this)}> Traer aulas </Text>
        <FloatingButton/>
      </View>
    );
  }
}
ActiveScreen.navigationOptions = {
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
