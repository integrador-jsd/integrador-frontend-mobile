import React, {Component} from 'react';
import { View, StyleSheet, Text, Alert, Image} from 'react-native';
import ActionButton from 'react-native-action-button';
import FloatingButton from '../../components/FloatingButton';

export default class ActiveScreen extends Component<{}> {
  render(){
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <FloatingButton/>
      </View>
    );
  }
}
ActiveScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(255,255,255)',
  },
  actionButtonIcon: {
    width: 33,
    height: 33
  },
});
