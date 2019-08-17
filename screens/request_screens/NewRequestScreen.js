import React, {Component} from 'react';
import { Modal, View,  StyleSheet,  Text,  TouchableHighlight, Alert, FlatList } from 'react-native';
import Card from '../../components/Card';
import Picker from '../../components/Picker';
import DatePicker from '../../components/DatePicker';

class NewRequestScreen extends React.PureComponent{
  constructor(props){
    super(props)

    this.state = {
        items: [],
      }


  }

  componentDidMount() {
    const url = 'https://jsonplaceholder.typicode.com/users';
    fetch(url)
    .then((response) => response.json())
    .then((responseJson) => {
       this.setState({items: responseJson})
    })
    .catch((error) => {
        console.log(error)
    });

  }


  render(){
    return (
      // <Modal
      //   onRequestClose={() => {
      //     this.props.navigation.goBack();
      //   }}>
        <View style = {styles.container}>
            <Text style={styles.header}>Nueva solicitud</Text>
            <View style = {styles.rows}>
              <Text style={styles.text}>Elija una fecha: </Text>
              <DatePicker mode={'date'} format = {'DD-MM-YYYY'}/>
            </View>
            <View style = {styles.rows}>
              <Text style={styles.text}>Hora inicial: </Text>
              <DatePicker mode={'time'} format = {'HH:mm'}/>
            </View>
            <View style = {styles.rows}>
              <Text style={styles.text}>Hora final:  </Text>
              <DatePicker mode={'time'} format = {'HH:mm'}/>
            </View>
            <View style= {[styles.rows, {marginRight:'2%', marginTop:10}]}>
              <Picker message={'Custom'} />
              <Picker message={'Custom'}/>
              <Picker message={'Custom'}/>
            </View>
            <View style={[styles.container,{borderTopColor:'black', borderTopWidth : 2, marginTop:15 }]} >
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
  text: {
    flex: 0.8,
    textAlign: 'left',
    fontSize: 20,
    color: '#335D3C',
    marginLeft: 20,
  }
});



export default NewRequestScreen;
