import React, {Component} from 'react';
import { View, StyleSheet, Text, Alert, Image} from 'react-native';
import ActionButton from 'react-native-action-button';

export default class ActiveScreen extends Component<{}> {
  render(){
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <ActionButton buttonColor="rgba(0,0,255,1)">
          <ActionButton.Item
            title="Atención en el aula"
            style={styles.actionButtonIcon}
            onPress={() => Alert.alert("Presionaste Aulas")}>
            <Image
              style={styles.actionButtonIcon}
              source={require('../../assets/images/sos.png')} />
          </ActionButton.Item>
          <ActionButton.Item
            title="Solicitar prestamo de aula"
            onPress={() => this.props.navigation.navigate('NewRequest')}>
            <Image
              style={styles.actionButtonIcon}
              source={require('../../assets/images/add-request.png')} />
          </ActionButton.Item>
        </ActionButton>
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
