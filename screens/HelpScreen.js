import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

export default function HelpScreen() {
  return (
    <View style={styles.container}>

    </View>
  );
}

HelpScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
