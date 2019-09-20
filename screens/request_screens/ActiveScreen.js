import React, {Component} from 'react';
import { View, StyleSheet, Text, Alert, Image, AsyncStorage, FlatList} from 'react-native';
import ActionButton from 'react-native-action-button';
import FloatingButton from '../../components/FloatingButton';
import CardRequest from '../../components/CardRequest';
import Colors from '../../constants/Colors';
import Loader from '../../components/Loader';

import firebase from 'firebase';

export default class ActiveScreen extends Component<{}> {
  state = {
    user: [],
    items: [],
    loader: false,
  }

  async componentDidMount(){
    await this.getUser();
    await this.getUserRequest();
  }

  getUserRequest(){
    this.setState({
      loader: true,
    });
    firebase.auth().currentUser.getIdToken(true).then(function(idToken) {
      var userName = this.state.user.data.username;
      const url = 'https://integrador-jsd-backend-dev.herokuapp.com/api/v1/requests/user/'+userName;
      fetch(url, {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
          idToken: idToken,
        }),
      }).then((response) => response.json())
        .then((responseJson) => {
            this.setState({
              items: responseJson,
              loader: false,
            });
          })
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
    return (
      <View style={styles.container}>
        <FlatList
          style={{marginTop:1}}
          data={this.state.items}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => <CardRequest item={item}/>}
          />
        <Loader loader={this.state.loader}/>
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
