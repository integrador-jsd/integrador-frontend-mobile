import DatePicker from 'react-native-datepicker';
import React, {Component} from 'react'
import {StyleSheet} from 'react-native';



class DatePickers extends Component {

  constructor(props){
    super(props)

    this.state = {newDate:'',
     currentDate:'',
      time: '',
      }

  }

  componentDidMount() {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year

    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    // var sec = new Date().getSeconds(); //Current Seconds

    this.setState({
      newDate: date + '/' + month + '/' + year,
      currentDate: date + '/' + month + '/' + year,
      time: hours+'/'+min,
    });

  }

   render() {
     if(this.props.mode == 'date'){
       return (
         <DatePicker
           style={styles.datepicker}
           date={this.state.newDate}
           mode={this.props.mode}
           format={this.props.format}
           minDate= {this.state.currentDate}
           confirmBtnText="Confirmar"
           cancelBtnText="Cancelar"
           iconSource = {require('../assets/images/calendar.png')}
           customStyles={{
             dateIcon: {
               position: 'absolute',
               left: 5,
               top: 4,
               marginLeft: 0,
               marginRight: 3,
             },
             dateInput: {
               alignItems: 'center',
               paddingLeft: 20,
               borderColor: '#335D3C',
             },
             alignSelf: 'center',
           }}
           onDateChange={(date) => {this.setState({newDate: date})}}
         />
       );
     }else{
       return(
         <DatePicker
           style={styles.datepicker}
           date={this.state.time}
           mode={this.props.mode}
           format={this.props.format}
           confirmBtnText="Confirmar"
           cancelBtnText="Cancelar"
           iconSource = {require('../assets/images/clock.png')}
           customStyles={{
             dateIcon: {
               position: 'absolute',
               left: 5,
               top: 4,
               marginLeft: 0,
               marginRight: 3,
             },
             dateInput: {
               alignItems: 'center',
               paddingLeft: 20,
               borderColor: '#335D3C',
             },
             alignSelf: 'center',
           }}
           onDateChange={(date) => {this.setState({time: date})}}
         />
       );
     }
   }
}

export default DatePickers

const styles = StyleSheet.create({
  datepicker: {
    width: 150,
    marginLeft: 10,
    alignItems: 'center',
  },
})
