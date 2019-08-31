import React, {Component} from 'react';
import { View, StyleSheet, Text, Alert, Image} from 'react-native';
import ActionButton from 'react-native-action-button';
import Colors from '../constants/Colors';
import { withNavigation } from 'react-navigation';

class FloatingButton extends Component<{}> {
  render(){
    const {navigate} = this.props.navigation;
    return (
      <ActionButton buttonColor= "rgba(10, 53, 28, 0.8)">
        <ActionButton.Item
          buttonColor= "rgba(10, 53, 28, 0.8)"
          title="Atención en el aula"
          style={styles.actionButtonIcon}
          onPress={() => Alert.alert("Presionaste Aulas")}>
          <Image
            style={styles.actionButtonIcon}
            source={require('../assets/images/sos.png')} />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor= "rgba(10, 53, 28, 0.8)"
          title="Solicitar prestamo de aula"
          onPress={() => this.props.navigation.navigate('NewRequest')}>
          <Image
            style={styles.actionButtonIcon}
            source={require('../assets/images/add-request.png')} />
        </ActionButton.Item>
      </ActionButton>
    );
  }
}

export default withNavigation(FloatingButton);

const styles = StyleSheet.create({
  actionButtonIcon: {
    width: 33,
    height: 33,
  },
});
