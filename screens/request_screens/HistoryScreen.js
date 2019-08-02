import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import FloatingButton from '../../components/FloatingButton';

export default function HistoryScreen() {
  return (
    <View style={styles.container}>
      <FloatingButton/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
