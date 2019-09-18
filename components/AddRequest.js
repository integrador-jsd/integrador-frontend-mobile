import React, {Component} from 'react';
import {View, Text, Button, TouchableOpacity, StyleSheet} from 'react-native';
import Modal from "react-native-modal";
import Colors from '../constants/Colors';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import CheckBox from 'react-native-check-box'



class AddRequest extends React.PureComponent{
  state={
    checkBox: {
      computer: false,
      videoBeam: false,
    },
    fontLoaded: false,
  }

  onPressRequest(){
    this.props.callback(true);
  }
  onPressCancel(){
    this.props.callback(false);
  }

  async componentDidMount() {
    await Font.loadAsync({
      'RalewayBold': require('../assets/fonts/Raleway-Bold.ttf'),
      'RalewayRegular': require('../assets/fonts/Raleway-RegularItalic.ttf'),
      'RalewayLightItalic': require('../assets/fonts/Raleway-LightItalic.ttf'),
    });
    this.setState({ fontLoaded: true });
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
              <View style={{backgroundColor: Colors.secondaryColor, padding:10, borderRadius:8,}}>
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

              <Text style={[styles.titleText, {fontSize: 20, paddingTop: 20, paddingBottom: 10}]}> Selecciona los items que necesites: </Text>
              <View style={{flexDirection:'row', padding: 10}}>
                <View style={styles.checkBoxContainer}>
                  <CheckBox
                  onClick={()=>{this.setState({checkBox: {...this.state.checkBox, otro: !this.state.checkBox.otro}})}}
                  isChecked={this.state.checkBox.otro}
                  checkBoxColor = {Colors.secondaryColor}/>
                  <Text style={styles.textStyleCheck}> Otro </Text>
                </View>
                <View style={styles.checkBoxContainer}>
                  <CheckBox
                  onClick={()=>{this.setState({checkBox: {...this.state.checkBox, otro: !this.state.checkBox.otro}})}}
                  isChecked={this.state.checkBox.otro}
                  checkBoxColor = {Colors.secondaryColor}/>
                  <Text style={styles.textStyleCheck}> Otro1 </Text>
                </View>
              </View>

              <View style={{flexDirection:'row', padding: 10}}>
                <View style={styles.checkBoxContainer}>
                  <CheckBox
                  onClick={()=>{this.setState({checkBox: {...this.state.checkBox, otro: !this.state.checkBox.otro}})}}
                  isChecked={this.state.checkBox.otro}
                  checkBoxColor = {Colors.secondaryColor}/>
                  <Text style={styles.textStyleCheck}> Video Beam </Text>
                </View>
                <View style={styles.checkBoxContainer}>
                  <CheckBox
                  onClick={()=>{this.setState({checkBox: {...this.state.checkBox, otro: !this.state.checkBox.otro}})}}
                  isChecked={this.state.checkBox.otro}
                  checkBoxColor = {Colors.secondaryColor}/>
                  <Text style={styles.textStyleCheck}> Computador </Text>
                </View>
              </View>

              <View style={{flexDirection:'row', padding:10, paddingTop:20}}>
                <TouchableOpacity style={{flex: 0.5, alignItems: 'flex-start'}}  onPress={this.onPressCancel.bind(this)}>
                  <Text style={{color: Colors.primaryColor, fontSize:18, flex:0, fontFamily: 'RalewayLightItalic'}}> Cancelar </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{flex: 0.5, alignItems: 'flex-end'}} onPress={this.onPressRequest.bind(this)}>
                  <Text style={{color: Colors.primaryColor, fontSize:18, flex:0, fontFamily: 'RalewayLightItalic'}}> Solicitar </Text>
                </TouchableOpacity>
              </View>

            </View>
          </Modal>
        </View>
      );
    }else{
      return(
        <AppLoading/>
      );
    }
  }
}

export default AddRequest;

AddRequest.navigationOptions = {
  header: null,
}

const styles = StyleSheet.create({
  checkBoxContainer:{
    flexDirection: 'row',
    flex: 0.5,
    alignItems: 'center',
  },
  textStyle: {
    color: Colors.whiteColor,
    fontSize: 20,
    fontFamily: 'RalewayRegular',
    flex: 0.5,
  },
  titleText: {
    color: Colors.primaryColor,
    fontSize: 30,
    fontFamily: 'RalewayBold',
    textAlign: 'center',
  },
  textStyleCheck: {
    color: Colors.primaryColor,
    fontSize: 16,
    fontFamily: 'RalewayRegular',
  },
});
