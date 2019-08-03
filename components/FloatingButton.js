import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ActionButton from 'react-native-action-button';

export default class FloatingButton extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ActionButton buttonColor="rgba(0,0,255,1)">
          <ActionButton.Item
            title="Atención en el aula"
            style={styles.actionButtonIcon}
            onPress={() => Alert.alert("Presionaste Aulas")}>
            <Image
              style={styles.actionButtonIcon}
              source={require('../assets/images/sos.png')} />
          </ActionButton.Item>

          <ActionButton.Item
            title="Solicitar prestamo de aula"
            onPress={() => Alert.alert("Presionaste Aulas")}>
            <Image
              style={styles.actionButtonIcon}
              source={require('../assets/images/add-request.png')} />
          </ActionButton.Item>
        </ActionButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  actionButtonIcon: {
    width: 33,
    height: 33
  },
});
