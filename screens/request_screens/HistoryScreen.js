import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';
import FloatingButton from '../../components/FloatingButton';

export default function HistoryScreen(){
    return (
      <View style={styles.container}/>
    );
}

HistoryScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(255,255,255)',
  },
});
