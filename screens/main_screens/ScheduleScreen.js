import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { MonoText } from '../../components/StyledText';

export default function ScheduleScreen() {
  return (
    <View style={styles.container}>

    </View>
  );
}

ScheduleScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
