import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import Modal from "react-native-modal";
import Colors from '../constants/Colors';
import * as Font from 'expo-font';
import Loader from './Loader';
import firebase from 'firebase';



class CardScheduleInfo extends React.PureComponent{

  state = {
    fontLoaded: false,
    rooms: {},
    load: false,
  }

  async componentDidMount() {
    await Font.loadAsync({
      'RalewayBold': require('../assets/fonts/Raleway-Bold.ttf'),
      'RalewayRegular': require('../assets/fonts/Raleway-RegularItalic.ttf'),
    });
    this.setState({ fontLoaded: true });
  }

  onPressCancel(){
    this.props.callback(false);
  }

  getRooms(){
    var sectionName = this.props.item.section.logisticUnit;
    var sectionID = this.props.item.section.id;
    firebase.auth().currentUser.getIdToken(true).then(function(idToken) {
      const url = 'https://integrador-jsd-backend-dev.herokuapp.com/api/v1/users/'+sectionName+'/sections/'+sectionID+'/rooms';
      fetch(url, {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
          idToken: idToken,
        }),
      }).then((response) => response.json())
        .then((responseJson) => {
          this.setState({
              rooms: responseJson,
              load: true,
          });
        })
    }.bind(this));
  }

  render(){
    if(this.state.fontLoaded && this.props.isVisible){
      {this.getRooms()}
      if(this.state.load){
        return (
          <View style={{ flex: 1 }}>
            <Modal
            isVisible={this.props.isVisible}
            onBackButtonPress={this.onPressCancel.bind(this)}
            backdropTransitionOutTiming={0}
            style={{padding:10}}
            >
              <View style={{backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius:8, opacity: 10}}>
                <View style={{backgroundColor: Colors.secondaryColor, padding:10, borderTopRightRadius: 8, borderTopLeftRadius: 8}}>
                  <Text style={[styles.titleText, {color: Colors.whiteColor}]}> Detalles del turno </Text>
                </View>
                <View style={{flexDirection:'row', marginTop:5}}>
                  <Text style={styles.textStyle}> Responsable: </Text>
                  <Text style={[styles.textStyle, {fontFamily: 'RalewayRegular'}]}>{this.props.item.assistant} </Text>
                </View>
                <View style={{flexDirection:'row', marginTop:5}}>
                  <Text style={styles.textStyle}> Horario: </Text>
                  <Text style={[styles.textStyle, {fontFamily: 'RalewayRegular'}]}>{this.props.item.start} - {this.props.item.end} </Text>
                </View>
                <View style={{flexDirection:'row', marginTop:5}}>
                  <Text style={styles.textStyle}> Unidad logistica: </Text>
                  <Text style={[styles.textStyle, {fontFamily: 'RalewayRegular'}]}>{this.props.item.section.logisticUnit} </Text>
                </View>
                <View style={{flexDirection:'row', marginTop:5}}>
                  <Text style={styles.textStyle}> Sector: </Text>
                  <Text style={[styles.textStyle, {fontFamily: 'RalewayRegular'}]}>{this.props.item.section.name} </Text>
                </View>
                <View style={{backgroundColor: Colors.secondaryColor, padding:10, marginTop: 10, borderBottomRightRadius: 8, borderBottomLeftRadius: 8}}>
                  <Text style={[styles.titleText, {fontSize:20, color: Colors.whiteColor, marginBottom: 7}]}>Aulas correspondientes al sector:</Text>
                  <FlatList
                    numColumns = {2}
                    style={{marginTop:1}}
                    data={this.state.rooms}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item}) => <Text style={[styles.textStyle, {color:Colors.whiteColor, fontFamily: 'RalewayRegular', textAlign:'center'}]}>{item.blockID} - {item.roomID}</Text>}
                    />
                </View>
              </View>
            </Modal>
          </View>
        );
      }else{
        return(
          <Loader loader={true}/>
        );
      }
    }else{
      return(
        <View/>
      );
    }
  }
}

export default CardScheduleInfo;

CardScheduleInfo.navigationOptions = {
  header: null,
}

const styles = StyleSheet.create({
  textStyle: {
    color: Colors.primaryColor,
    fontSize: 18,
    fontFamily: 'RalewayBold',
    flex: 0.5,
  },
  titleText: {
    color: Colors.primaryColor,
    fontSize: 28,
    fontFamily: 'RalewayBold',
    textAlign: 'center',
    paddingBottom: 10,
  },
  textStyleOption: {
    justifyContent: 'center',
    height:40,
    flex: 1,
  },
});
