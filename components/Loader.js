import React, { Component } from 'react';
import {
  ActivityIndicator, View,
} from 'react-native';
import Colors from '../constants/Colors';
import Modal from "react-native-modal";


class Loader extends React.PureComponent{
  render(){
    return (
      <Modal isVisible={this.props.loader}
        backdropTransitionOutTiming={0}
        style={{padding:10}}>
          <ActivityIndicator size="large" color={Colors.whiteColor} />
      </Modal>
    )
  }
}

export default Loader;
