import React, {Component} from 'react';
import {View, Text, Button, TouchableOpacity} from 'react-native';
import Modal from "react-native-modal";
import Colors from '../constants/Colors';



class AddRequest extends React.PureComponent{

  onPressRequest(){
    this.props.callback(true);
  }
  onPressCancel(){
    this.props.callback(false);
  }


  render(){
    return (
      <View style={{ flex: 1 }}>
        <Modal
        isVisible={this.props.isVisible}
        onBackButtonPress={this.onPressCancel.bind(this)}
        backdropTransitionOutTiming={0}
        style={{padding:10}}
        >
          <View style={{ flex: 1, backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius:8, opacity: 10}}>

            <Text> Holaaa </Text>




            <View style={{flexDirection:'row', position:'absolute', bottom: 0, justifyContent:'center', width:'100%'}}>
              <TouchableOpacity style={{flex: 0.5, alignItems: 'flex-start', padding:10}}  onPress={this.onPressCancel.bind(this)}>
                <Text> Cancelar </Text>
              </TouchableOpacity>
              <TouchableOpacity style={{flex: 0.5, alignItems: 'flex-end', padding:10}} onPress={this.onPressRequest.bind(this)}>
                <Text> Solicitar </Text>
              </TouchableOpacity>
            </View>

          </View>
        </Modal>
      </View>
    );
  }
}

export default AddRequest;

AddRequest.navigationOptions = {
  header: null,
}
