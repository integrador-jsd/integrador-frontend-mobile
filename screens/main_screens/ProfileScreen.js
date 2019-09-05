import React, {Component} from 'react';
import { View, StyleSheet, Button, Image, Text} from 'react-native';
import ActionButton from 'react-native-action-button';
import firebase from 'firebase';
import Colors from '../../constants/Colors';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

export default class ActiveScreen extends Component<{}> {

  constructor(props){
    super(props)
    var user = firebase.auth().currentUser;
    this.state = {
      name: user.displayName,
      email: user.email,
      photo: user.photoURL,
      fontLoaded: false,
    }
  }

  async componentDidMount() {
    await Font.loadAsync({
      'RalewayThin': require('../../assets/fonts/Raleway-Thin.ttf'),
      'RalewayRegular': require('../../assets/fonts/Raleway-Regular.ttf'),
    });
    this.setState({ fontLoaded: true });
  }

  logout = async () => {
  try {
        await firebase.auth().signOut();
    } catch (e) {
        console.log(e);
    }
}

  render(){
    const {navigate} = this.props.navigation;
    if(this.state.fontLoaded){
      return (
        <View style={styles.container}>
          <View style = {styles.rows}>
            <Image
              style={styles.userImage}
              source={{uri:this.state.photo}}/>
            <View style={{marginLeft:30, justifyContent:'center'}}>
              <Text style={styles.textStyle}>{this.state.name}</Text>
              <Text style={styles.emailStyle}>{this.state.email}</Text>
            </View>
          </View>
          <Button color="#0A351C" title="Salir" onPress={()=> this.logout()} />
        </View>
      );
    }else{
      return(
        <AppLoading/>
      );
    }
  }
}
ActiveScreen.navigationOptions = {
  header: null,
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.complementaryColor,
  },
  userImage: {
    width: 90,
    height: 90,
    borderRadius:100,
  },
  rows: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: Colors.secondaryColor,
  },
  textStyle:{
    color: Colors.whiteColor,
    fontFamily: 'RalewayRegular'
  },
  emailStyle:{
    color: Colors.whiteColor,
    fontFamily: 'RalewayThin',
  }
});
