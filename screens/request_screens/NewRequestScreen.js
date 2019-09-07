import React, {Component} from 'react';
import { Modal, View,  StyleSheet,  Text,  TouchableHighlight, Alert, FlatList } from 'react-native';
import Card from '../../components/Card';
import Picker from '../../components/Picker';
import DatePicker from '../../components/DatePicker';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import Colors from '../../constants/Colors';

class NewRequestScreen extends React.PureComponent{
  constructor(props){
    super(props)

    this.state = {
        items: [],
        fontLoaded:false,
        date: '',
        startTime:'',
        endTime:'',
      }


  }

  async componentDidMount() {
    const url = 'https://jsonplaceholder.typicode.com/users';
    fetch(url)
    .then((response) => response.json())
    .then((responseJson) => {
       this.setState({items: responseJson})
    })
    .catch((error) => {
        console.log(error)
    });

    await Font.loadAsync({
      'RalewayBold': require('../../assets/fonts/Raleway-Bold.ttf'),
      'RalewayRegular': require('../../assets/fonts/Raleway-Regular.ttf'),
    });
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
                  renderItem={({item}) => <Card item={item}/>}
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
