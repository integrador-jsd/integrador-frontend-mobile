import React, {Component} from 'react';
import { View, StyleSheet, Button} from 'react-native';
import ActionButton from 'react-native-action-button';
import firebase from 'firebase';

export default class ActiveScreen extends Component<{}> {

  logout = async () => {
  try {
        await firebase.auth().signOut();
    } catch (e) {
        console.log(e);
    }
}

  render(){
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <Button title="Salir" onPress={()=> this.logout()} />
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
