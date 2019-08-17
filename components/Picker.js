import React, { Component } from 'react';
import { View, Text, Picker, StyleSheet } from 'react-native'

class Pickers extends Component {
  constructor(props){
    super(props);
  }
   state = {user: ''}
   updateUser = (user) => {
      this.setState({ user: user })
   }

   render() {
      return (
        <View style = {styles.picker}>
          <Picker style = {{flex:1}} selectedValue = {this.state.user} onValueChange = {this.updateUser}>
             <Picker.Item label = {this.props.message} value = "bloque" />
             <Picker.Item label = "Ellen" value = "ellen" />
             <Picker.Item label = "Maria" value = "maria" />
          </Picker>
        </View>
      )
   }
}
export default Pickers

styles = StyleSheet.create({
  picker: {
    borderColor: '#1E8449',
    width: '30%',
    borderRadius: 10,
    borderWidth: 1,
    overflow: 'hidden',
    marginLeft: '3%'

  }
});
