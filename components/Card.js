import React, {PureComponent} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';

export default class Card extends React.PureComponent {
  render(){
    return (
      <TouchableOpacity style={styles.card}
        onPress={() => {Alert.alert('Informacion');}}>
        <Text style={styles.cardTitle}> Bloque - Aula: {this.props.item.name} </Text>
        <Text style={styles.cardAbout}> Tipo </Text>
        <Text style={styles.cardAbout}> click para mas descripcion </Text>
      </TouchableOpacity>
    );
  }
}


onPress = () => {
   console.log('Informacion aqui')
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(255,255,255)',
  },
  card: {
    backgroundColor : '#1E8449',
    marginLeft: '3%',
    marginTop: 5,
    width: '94%',
    shadowColor: '#ABEBC6',
    borderRadius: 5,
    elevation:3,
    shadowRadius: 1,
    shadowOffset: {
      width:3,
      height:3,
    }
  },
  cardTitle: {
    fontSize:20,
    fontWeight: 'bold',
    color: 'rgb(255,255,255)',
  },
  cardAbout: {
    fontSize: 10,
    color: 'rgb(255,255,255)',
  },
  cardType:{
    fontSize: 10,
    color: 'rgb(255,255,255)',
  }
});
