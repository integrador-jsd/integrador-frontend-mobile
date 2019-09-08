import React, {Component} from 'react';
import { Modal, View,  StyleSheet,  Text,  TouchableHighlight, Alert, FlatList, AsyncStorage } from 'react-native';
import Card from '../../components/Card';
import Picker from '../../components/Picker';
import DatePicker from '../../components/DatePicker';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import Colors from '../../constants/Colors';
import firebase from 'firebase';

class NewRequestScreen extends React.PureComponent{
  constructor(props){
    super(props)

    this.state = {
        items: [],
        fontLoaded:false,
        date: '',
        startTime:'',
        endTime:'',
        user: '',
      }


  }

  async componentDidMount() {
    this.loadItems();
    await Font.loadAsync({
      'RalewayBold': require('../../assets/fonts/Raleway-Bold.ttf'),
      'RalewayRegular': require('../../assets/fonts/Raleway-Regular.ttf'),
    });
    this.getUser();
    this.setState({ fontLoaded: true });
  }

  getDate(date){
    this.setState({date: date});
    if(this.state.startTime && this.state.endTime){
      console.log('lanzar consulta despues de date');
    }
  }

  getStartTime(startTime){
    this.setState({startTime: startTime});
    if(this.state.date && this.state.endTime){
      console.log('lanzar consulta despues de StartTime');
    }
  }

  getEndTime(endTime){
    this.setState({endTime: endTime});
    if(this.state.startTime && this.state.date){
      console.log('lanzar consulta despues de endTime');
    }
  }

  loadItems (){
    firebase.auth().currentUser.getIdToken(true).then(function(idToken) {
      const url = 'https://integrador-jsd-backend.herokuapp.com/api/v1/sectionals/1/blocks/19/rooms';
      fetch(url, {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
          idToken: idToken,
        }),
      }).then((response) => response.json())
        .then((responseJson) => this.setState({items: responseJson}));
    }.bind(this));
  }

  addRequest (room){
    firebase.auth().currentUser.getIdToken(true).then(function(idToken) {
      const url = 'https://integrador-jsd-backend.herokuapp.com/api/v1/requests';
      fetch(url, {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json',
          idToken: idToken,
        }),
        body: JSON.stringify({
          startTime: this.state.date +" "+ this.state.startTime,
          endTime: this.state.date+" "+this.state.endTime,
          requestType: 1,
          stateID: 1,
          createdBy: this.state.user.data.username,
          sectionalID: room.sectionalID,
          blockID: room.blockID,
          roomID: room.id,
          items: [1,2],
        })
      }).then((response) => response.json())
        .then((responseJson) => console.log(responseJson));
    }.bind(this));
  }

  getUser = async () => {
    try {
      const value = await AsyncStorage.getItem('user');
      if (value !== null) {
        this.setState({
          user : JSON.parse(value),
        });
      }
    } catch (error) {
      console.log(error);
    }
  };



  render(){
    if(this.state.fontLoaded){
      return (
        // <Modal
        //   onRequestClose={() => {
        //     this.props.navigation.goBack();
        //   }}>
          <View style = {styles.container}>
              <Text style={styles.header}>Nueva solicitud</Text>
              <View style = {styles.rows}>
                <Text style={styles.text}>Elija una fecha: </Text>
                <DatePicker callback = {this.getDate.bind(this)} mode={'date'} format = {'YYYY-MM-DD'}/>
              </View>
              <View style = {styles.rows}>
                <Text style={styles.text}>Hora inicial: </Text>
                <DatePicker callback = {this.getStartTime.bind(this)} mode={'time'} format = {'HH:mm'}/>
              </View>
              <View style = {styles.rows}>
                <Text style={styles.text}>Hora final:  </Text>
                <DatePicker callback = {this.getEndTime.bind(this)} mode={'time'} format = {'HH:mm'}/>
              </View>
              <View style= {[styles.rows, {marginRight:'2%', marginTop:10}]}>
                <Picker message={'Custom'} />
                <Picker message={'Custom'}/>
                <Picker message={'Custom'}/>
              </View>
              <View style={[styles.container,{borderTopColor:Colors.primaryColor, borderTopWidth : 2, marginTop:15 }]} >
                <FlatList
                  style={{marginTop:1}}
                  data={this.state.items}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item}) => <Card callback={this.addRequest.bind(this)} item={item}/>}
                  />
              </View>
          </View>


        // </Modal>
      );
    }else{
      return(
        <AppLoading/>
      );
    }

  }
}

NewRequestScreen.navigationOptions = {
  header: null,
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.whiteColor,
  },
  rows: {
    flex: 0.1,
    flexDirection: 'row',
    backgroundColor: Colors.whiteColor,
  },
  header: {
    textAlign: 'center',
    fontSize: 40,
    fontFamily:'RalewayBold',
    color: Colors.primaryColor,
    marginBottom: 20,
    marginTop: 10,
  },
  text: {
    flex: 0.8,
    textAlign: 'left',
    fontSize: 20,
    color: Colors.primaryColor,
    fontFamily: 'RalewayRegular',
    marginLeft: 20,
  }
});



export default NewRequestScreen;
