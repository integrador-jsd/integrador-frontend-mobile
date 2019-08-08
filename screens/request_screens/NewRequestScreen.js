import React, {Component} from 'react';
import { Modal, View,  StyleSheet,  Text,  Picker,  TouchableHighlight, Alert, TextInput } from 'react-native';
import DatePicker from 'react-native-datepicker'
import Icon from 'react-native-vector-icons/MaterialIcons'

class NewRequestScreen extends Component<{}>{
  constructor(props){
    super(props)

    this.state = {newDate:'',
     currentDate:'',
      startTime: '',
       endTime: '',}


  }

  componentDidMount() {
    that = this;
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year

    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    // var sec = new Date().getSeconds(); //Current Seconds

    that.setState({
      newDate: date + '/' + month + '/' + year,
      currentDate: date + '/' + month + '/' + year,
      endTime: hours+'/'+min,
      startTime: hours+'/'+min,
    });

  }

  render(){
    return (
      <Modal
        onRequestClose={() => {
          this.props.navigation.goBack();
        }}>
        <View style = {styles.container}>
            <Text style={styles.header}>Nueva solicitud</Text>
            <View style = {styles.rows}>
              <Text style={styles.text}>Elija una fecha: </Text>
              <DatePicker
                style={styles.datepicker}
                date={this.state.newDate}
                mode="date"
                placeholder="Ingrese la fecha"
                format="DD-MM-YYYY"
                minDate= {this.state.currentDate}
                confirmBtnText="Confirmar"
                cancelBtnText="Cancelar"
                iconSource = {require('../../assets/images/calendar.png')}
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 5,
                    top: 4,
                    marginLeft: 0,
                    marginRight: 3,
                  },
                  dateInput: {
                    alignItems: 'flex-end',
                    paddingRight: 20,
                    borderColor: '#335D3C',
                  },
                  alignSelf: 'center',
                }}
                onDateChange={(date) => {this.setState({newDate: date})}}
              >
              </DatePicker>
            </View>
            <View style = {styles.rows}>
              <Text style={styles.text}>Hora inicial: </Text>
              <DatePicker
                style={styles.datepicker}
                date={this.state.startTime}
                mode="time"
                is24Hour = {true}
                display = "default"
                format="HH:mm"
                confirmBtnText="Confirmar"
                cancelBtnText="Cancelar"
                iconSource = {require('../../assets/images/clock.png')}
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 5,
                    top: 4,
                    marginLeft: 0,
                  },
                  dateInput: {
                    alignItems: 'flex-end',
                    paddingRight: 45,
                    borderColor: '#335D3C',
                  }
                }}
                onDateChange={(date) => {this.setState({startTime: date})}}
              >
              </DatePicker>
            </View>
            <View style = {styles.rows}>
              <Text style={styles.text}>Hora final:  </Text>
              <DatePicker
                style={styles.datepicker}
                date={this.state.endTime}
                mode="time"
                is24Hour = {true}
                display = "default"
                format="HH:mm"
                confirmBtnText="Confirmar"
                cancelBtnText="Cancelar"
                iconSource = {require('../../assets/images/clock.png')}
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 5,
                    top: 4,
                    marginLeft: 0,
                  },
                  dateInput: {
                    alignItems: 'flex-end',
                    paddingRight: 45,
                    borderColor: '#335D3C',
                  },
                }}
                onDateChange={(date) => {this.setState({endTime: date})}}
              >
              </DatePicker>
            </View>
        </View>
      </Modal>
    );
  }
}

NewRequestScreen.navigationOptions = {
  header: null,
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'rgb(255,255,255)',
  },
  rows: {
    flex: 0.1,
    flexDirection: 'row',
    backgroundColor: 'rgb(255,255,255)',
  },
  header: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 40,
    color: '#335D3C',
    marginBottom: 20,
    marginTop: 10,
  },
  textinput: {
    alignSelf: 'stretch',
    height: 40,
    marginBottom:40,
    borderBottomColor: '#335D3C',
    borderBottomWidth:1,
  },
  datepicker: {
    width: 150,
    marginLeft: 10,
    alignItems: 'flex-end',
  },
  text: {
    flex: 0.8,
    textAlign: 'left',
    fontSize: 20,
    color: '#335D3C',
    marginLeft: 20,
  }
});



export default NewRequestScreen;
