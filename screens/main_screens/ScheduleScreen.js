import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';
import {Agenda} from 'react-native-calendars';
import Colors from '../../constants/Colors';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';

export default class ScheduleScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {},
      currentDate: '',
      fontLoaded:false,
    };
  }

  async componentDidMount() {

    await Font.loadAsync({
      'RalewaySemiBold': require('../../assets/fonts/Raleway-SemiBold.ttf'),
      'RalewayRegular': require('../../assets/fonts/Raleway-Regular.ttf'),
    });
    this.setState({ fontLoaded: true });


    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year

    this.setState({
      currentDate: year + '-' + month + '-' + date,
    });


    this.loadSchedule();



  }

  render() {
    if(this.state.fontLoaded){
      return (
        <View style={styles.container}>
          <Agenda
            items={this.state.items}
            loadItemsForMonth={this.loadItems.bind(this)}
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
            onRefresh={() => console.log('refreshing...')}
            pastScrollRange={6}
            futureScrollRange={6}
            scrollEnabled={true}
          />
        </View>
      );
    }else{
      return(
        <AppLoading/>
      );
    }
  }


  loadSchedule(){
    const url = 'https://integrador-jsd-backend.herokuapp.com/api/v1/users/carlos.montoyah/turns/?format=calendar';
    fetch(url)
    .then((response) => response.json())
    .then((responseJson) => {
       this.setState({items: responseJson})
    })
    .catch((error) => {
        console.log(error)
    });
  }

  loadItems(day) {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        if (!this.state.items[strTime]) {
          this.state.items[strTime] = [];
        }
      }
      const newItems = {};
      Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
      this.setState({
        items: newItems
      });
    }, 300);
  }

  renderItem(item) {
    return (
      <View style={styles.item}>
        <Text style={[styles.text, {color:Colors.whiteColor}]}>Encargado: {item.assistant}</Text>
        <Text style={[styles.text, {color:Colors.whiteColor}]}>Sector: {item.section.name}</Text>
        <Text style={[styles.text, {color:Colors.whiteColor}]}>Horario: {item.start} - {item.end}</Text>
      </View>
    );
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
