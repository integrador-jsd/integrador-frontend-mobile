import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  AsyncStorage,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {Agenda} from 'react-native-calendars';
import Colors from '../../constants/Colors';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import firebase from 'firebase';
import ScheduleInfo from '../../components/CardScheduleInfo';

export default class ScheduleScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {},
      currentDate: '',
      fontLoaded:false,
      user: [],
      info: false,
      item: [],
    };
  }

  async componentDidMount() {

    await Font.loadAsync({
      'RalewaySemiBold': require('../../assets/fonts/Raleway-SemiBold.ttf'),
      'RalewayRegular': require('../../assets/fonts/Raleway-Regular.ttf'),
    });
    this.setState({ fontLoaded: true });
    await this.getUser();
    this.loadSchedule();

    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year

    this.setState({
      currentDate: year + '-' + month + '-' + date,
    });



  }

  render() {
    if(this.state.fontLoaded){
      return (
        <View style={styles.container}>
          <Agenda
            items={this.state.items}
            selected={this.state.currentDate}
            renderItem={this.renderItem.bind(this)}
            renderEmptyDate={this.renderEmptyDate.bind(this)}
            rowHasChanged={this.rowHasChanged.bind(this)}
            theme={{
              selectedDotColor: Colors.whiteColor,
              dotColor: Colors.secondaryColor,
              SelectedDayTextColor: Colors.whiteColor,
              selectedDayBackgroundColor: Colors.secondaryColor,
              textSectionTitleColor: Colors.primaryColor,
              todayTextColor: Colors.secondaryColor,
              calendarTextColor: Colors.primaryColor,
              calendarBackground:Colors.whiteColor,
              agendaDayTextColor: Colors.primaryColor,
              agendaDayNumColor: Colors.primaryColor,
              agendaTodayColor: Colors.secondaryColor,
              agendaKnobColor: Colors.primaryColor,
              dayTextColor: Colors.primaryColor,
              textDayFontFamily: 'RalewayRegular',
              textDayHeaderFontFamily: 'RalewaySemiBold',
              textMonthFontFamily: 'RalewaySemiBold',
              calendarBackground: Colors.complementaryColor,
              backgroundColor: Colors.whiteColor,
            }}
            onRefresh={() => this.loadSchedule()}
            pastScrollRange={2}
            futureScrollRange={2}
            scrollEnabled={true}
          />
          <View>
            <ScheduleInfo callback={this.scheduleInfo.bind(this)} isVisible={this.state.info} item={this.state.item} />
          </View>
        </View>
      );
    }else{
      return(
        <View/>
      );
    }
  }


  loadSchedule(){
    firebase.auth().currentUser.getIdToken(true).then(function(idToken) {
      var userName = this.state.user.data.username;
      const url = 'https://integrador-jsd-backend-dev.herokuapp.com/api/v1/users/'+userName+'/turns/?format=calendar';
      fetch(url, {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
          idToken: idToken,
        }),
      }).then((response) => response.json())
        .then((responseJson) => {

          var date = new Date();
          var timestamp = date.getTime();
          for (let i = -62-date.getDate(); i < 92 - date.getDate() ; i++) {
            const time = timestamp + i * 24 * 60 * 60 * 1000;
            const strTime = this.timeToString(time);
            if (!this.state.items[strTime]) {
              this.state.items[strTime] = [];
            }
          }
          Object.keys(responseJson).forEach(key => {this.state.items[key] = responseJson[key];});
          this.setState({
            items: this.state.items,
          });



        })
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

  renderItem(item) {
    return (
      <TouchableOpacity style={styles.item} onPress={() => this.scheduleInfo(item)}>
        <Text style={[styles.text, {color:Colors.whiteColor}]}>Encargado: {item.assistant}</Text>
        <Text style={[styles.text, {color:Colors.whiteColor}]}>Sector: {item.section.name}</Text>
        <Text style={[styles.text, {color:Colors.whiteColor}]}>Horario: {item.start} - {item.end}</Text>
      </TouchableOpacity>
    );
  }

  scheduleInfo(item){
    this.setState({
      item: item,
      info: !this.state.info,
    });
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}><Text style={styles.text}>No hay nada asigando aun para este dia</Text></View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
}

ScheduleScreen.navigationOptions={
  header:null,
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: Colors.secondaryColor,
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    paddingTop: 45,
    marginLeft:10,
    flex:1,
    color: Colors.primaryColor
  },
  text:{
    color:Colors.blackColor,
    fontFamily: 'RalewayRegular',
  },
  container: {
    flex:1,
  }
});
