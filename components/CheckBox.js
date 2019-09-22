import React, {PureComponent} from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';
import * as Font from 'expo-font';
import Colors from '../constants/Colors';
import CheckBox from 'react-native-check-box'
import Loader from './Loader';


export default class CheckBoxItem extends React.PureComponent {

  state={
    fontLoaded: false,
    checkBox: {
      status: false,
      id: '',
    }
  }

  async componentDidMount(){
    this.state.checkBox.id = this.props.item.id;
    await Font.loadAsync({
      'RalewayMedium': require('../assets/fonts/Raleway-Regular.ttf'),
    });
    this.setState({ fontLoaded: true });
  }


  onPress() {
    this.state.checkBox.status = !this.state.checkBox.status;
    this.setState({checkBox: {...this.state.checkBox}});
    this.props.callback(this.state.checkBox);
  }


  render(){
    if(this.state.fontLoaded){
      return (
        <View style={styles.checkBoxContainer}>
          <CheckBox
          onClick={this.onPress.bind(this)}
          isChecked={this.state.checkBox.status}
          checkBoxColor = {Colors.secondaryColor}/>
          <Text onPress={this.onPress.bind(this)} style={styles.textStyleCheck}>{this.props.item.description}</Text>
        </View>
      );
    }else{
      return(
        <Loader loader={true} />
      );
    }
  }
}

const styles = StyleSheet.create({
  checkBoxContainer:{
    paddingTop: 5,
    flexDirection: 'row',
    flex: 0.5,
    alignItems: 'center',
  },
  textStyleCheck: {
    color: Colors.primaryColor,
    fontSize: 16,
    fontFamily: 'RalewayRegular',
  },
});
