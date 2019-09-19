import React, {Component} from 'react';
import { Modal, View,  StyleSheet,  Text,  TouchableHighlight, Alert, FlatList, AsyncStorage } from 'react-native';
import Card from '../../components/Card';
import Picker from '../../components/Picker';
import DatePicker from '../../components/DatePicker';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import Colors from '../../constants/Colors';
import firebase from 'firebase';
import AddRequest from '../../components/AddRequest';
import Loader from '../../components/Loader';

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
        isVisible: false,
        item: {},
        loader: false,
      }


  }

  async componentDidMount() {
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
      this.loadItems();
    }
  }

  getStartTime(startTime){
    this.setState({startTime: startTime});
    if(this.state.date && this.state.endTime){
      this.loadItems();
    }
  }

  getEndTime(endTime){
    this.setState({endTime: endTime});
    if(this.state.startTime && this.state.date){
      this.loadItems();
    }
  }

  loadItems (){
    this.state.loader = true;
    firebase.auth().currentUser.getIdToken(true).then(function(idToken) {
      const url = 'https://integrador-jsd-backend.herokuapp.com/api/v1/sectionals/1/blocks/19/rooms';
      fetch(url, {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
          idToken: idToken,
        }),
        // body: JSON.stringify({
        //   startTime: this.state.date +" "+ this.state.startTime,
        //   endTime: this.state.date+" "+this.state.endTime,
        // })
      }).then((response) => response.json())
        .then((responseJson) => this.setState({items: responseJson}));
    }.bind(this));

    //wait loading
    setTimeout(() => {
      this.setState({
        loader:false,
      });
    }, 2000);
  }

  preRequest (room){
    this.state.item = room;
    this.setState({
      isVisible: true,
    });

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

  hideModal(result){
    this.setState({
      isVisible:false,
    });
    if(result.status){
      var item = [];
      if(result.chair){
        item.push(1);
      }
      if(result.videoBeam){
        item.push(2);
      }
      if(result.portatil){
        item.push(3);
      }
      if(result.computer){
        item.push(4);
      }
      this.addRequest(item);
    }
  }

  addRequest(result){
    this.state.loader = true;
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
          sectionalID: this.state.item.sectionalID,
          blockID: this.state.item.blockID,
          roomID: this.state.item.id,
          items: result,
        })
      }).then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            loader:false,
          });
          Alert.alert(responseJson.message);
        });
    }.bind(this));
  }



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
                  renderItem={({item}) => <Card callback={this.preRequest.bind(this)} item={item}/>}
                  />
                  <AddRequest callback={this.hideModal.bind(this)} item={this.state.item} isVisible = {this.state.isVisible} />
                  <Loader loader={this.state.loader}/>
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
