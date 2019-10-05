import React, {Component} from 'react';
import {View, Text, Button, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import Modal from "react-native-modal";
import Colors from '../constants/Colors';
import * as Font from 'expo-font';
import CheckBox from './CheckBox';
import firebase from 'firebase';
import  Loader from './Loader';



class AddRequest extends React.PureComponent{
  state={
    allItems: [],
    checkBox: {
      status: false,
      selectItems: [],
    },
    fontLoaded: false,
  }

  onPressRequest(){
    this.state.checkBox.status = true;
    this.props.callback(this.state.checkBox);
    this.state.checkBox.status = false;
    this.state.checkBox.selectItems = [];
  }
  onPressCancel(){
    this.state.checkBox.status = false;
    this.props.callback(this.state.checkBox);
    this.state.checkBox.selectItems = [];
  }

  async componentDidMount() {
    await Font.loadAsync({
      'RalewayBold': require('../assets/fonts/Raleway-Bold.ttf'),
      'RalewayRegular': require('../assets/fonts/Raleway-RegularItalic.ttf'),
      'RalewayLightItalic': require('../assets/fonts/Raleway-LightItalic.ttf'),
    });
    this.setState({ fontLoaded: true });
    this.getItems();
  }

  getItems(){
    firebase.auth().currentUser.getIdToken(true).then(function(idToken) {
      const url = 'http://integrador-jsd-backend-dev.herokuapp.com/api/v1/items/types';
      fetch(url, {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
          idToken: idToken,
        }),
      }).then((response) => response.json())
        .then((responseJson) => this.setState({allItems: responseJson}))
      }.bind(this));
  }

  callBackCheckBox(item){
    if(item.status){
      this.state.checkBox.selectItems.push({
        itemType: item.id,
        quantity: 1,
      });
    }else{
      var removeIndex = this.state.checkBox.selectItems.map(function(option) { return option.id; }).indexOf(item.id);
      this.state.checkBox.selectItems.splice(removeIndex, 1);
    }
  }

  render(){
    if(this.state.fontLoaded){
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
                <Text style={[styles.titleText, {color: Colors.whiteColor}]}> Solicitud </Text>
                <View style={{flexDirection:'row'}}>
                  <Text style={styles.textStyle}> Bloque: {this.props.item.blockID} </Text>
                  <Text style={styles.textStyle}> Aula: {this.props.item.id} </Text>
                </View>
                <View style={{flexDirection:'row'}}>
                  <Text style={styles.textStyle}> Tipo: {this.props.item.type} </Text>
                  <Text style={styles.textStyle}> Capacidad: {this.props.item.capacity} </Text>
                </View>
                <Text style={[styles.textStyle, {flex: 0}]}> Seccional: {this.props.item.sectionalID} </Text>
              </View>
              <View>
                <Text style={[styles.titleText, {fontSize: 20, paddingTop: 20, paddingBottom: 10}]}> Selecciona los items que necesites: </Text>
                <FlatList
                  numColumns = {2}
                  style={{marginTop:1}}
                  data={this.state.allItems}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item}) => <CheckBox callback={this.callBackCheckBox.bind(this)} item={item} />}
                  />
              </View>
              <View style={{flexDirection:'row', paddingTop:20}}>
                <TouchableOpacity style={[styles.textStyleOption, {borderBottomLeftRadius:8} ]}  onPress={this.onPressCancel.bind(this)}>
                  <Text style={{color: Colors.whiteColor, fontSize:18, flex:0, fontFamily: 'RalewayRegular'}}> Cancelar </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.textStyleOption, {borderBottomRightRadius:8} ]} onPress={this.onPressRequest.bind(this)}>
                  <Text style={{color: Colors.whiteColor, fontSize:18, flex:0, fontFamily: 'RalewayRegular'}}> Solicitar </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      );
    }else{
      return(
        <Loader loader={true} />
      );
    }
  }
}

export default AddRequest;

AddRequest.navigationOptions = {
  header: null,
}

const styles = StyleSheet.create({
  textStyle: {
    color: Colors.whiteColor,
    fontSize: 18,
    fontFamily: 'RalewayRegular',
    flex: 0.5,
  },
  titleText: {
    color: Colors.primaryColor,
    fontSize: 32,
    fontFamily: 'RalewayBold',
    textAlign: 'center',
    paddingBottom: 10,
  },
  textStyleCheck: {
    color: Colors.primaryColor,
    fontSize: 16,
    fontFamily: 'RalewayRegular',
  },
  textStyleOption: {
    flex: 0.5, alignItems: 'center',
    justifyContent:'center',
    backgroundColor:Colors.secondaryColor,
    height:40,
  },
});
