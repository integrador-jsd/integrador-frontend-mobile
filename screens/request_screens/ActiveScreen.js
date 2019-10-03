import React, {Component} from 'react';
import { View, StyleSheet, Text, AsyncStorage, FlatList, RefreshControl} from 'react-native';
import FloatingButton from '../../components/FloatingButton';
import CardRequest from '../../components/CardRequest';
import Colors from '../../constants/Colors';
import CardRequestInfo from '../../components/CardRequestInfo';
import firebase from 'firebase';

export default class ActiveScreen extends Component<{}> {
  state = {
    user: [],
    items: [],
    isVisible: false,
    item: {},
    update: true,
  }

  async componentDidMount(){
    await this.getUser();
    await this.getUserRequest();
  }

  getUserRequest(){
    firebase.auth().currentUser.getIdToken(true).then(function(idToken) {
      var userName = this.state.user.data.username;
      const url = 'https://integrador-jsd-backend-dev.herokuapp.com/api/v1/requests/user/'+userName+'?active=true';
      fetch(url, {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
          idToken: idToken,
        }),
      }).then((response) => response.json())
        .then((responseJson) => {
            if(responseJson.message){
              this.setState({
                update: false,
              });
            }else{
              this.setState({
                items: responseJson,
                update: false,
              });
            }
          })
    }.bind(this));
  }

  loadMore = () => {
    this.setState({
      update: true,
    }, () => {
      this.getUserRequest();
    })
  }

  getUser = async () => {
    try {
      const value = await AsyncStorage.getItem('user');
      if (value !== null) {
        this.state.user =  JSON.parse(value);
      }
    } catch (error) {
      console.log(error);
    }
  };

  callBackCard(status){
    this.setState({
      isVisible: false,
    });
    if(status){
      firebase.auth().currentUser.getIdToken(true).then(function(idToken) {
        var userName = this.state.item.createdBy;
        const url = 'https://integrador-jsd-backend-dev.herokuapp.com/api/v1/requests/'+this.state.item.id;
        fetch(url, {
          method: 'PUT',
          headers: new Headers({
            'Content-Type': 'application/json',
            idToken: idToken,
          }),
          body : JSON.stringify({
            stateID: 2,
          })
        }).then((response) => response.json())
          .then((responseJson) => {
              this.getUserRequest();
            })
      }.bind(this));
    }
  }

  preRequest (room){
    this.state.item = room;
    this.setState({
      isVisible: true,
    });
  }

  render(){
      return (
        <View style={styles.container}>
          <FlatList
            style={{marginTop:1}}
            data={this.state.items}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => <CardRequest callback={this.preRequest.bind(this)} item={item}/>}
            refreshing = {this.state.update}
            onRefresh = {this.loadMore}
            />
          <CardRequestInfo callback={this.callBackCard.bind(this)} isVisible={this.state.isVisible} item={this.state.item} />
          <FloatingButton/>
        </View>
      );
      if(this.state.update){
        return(
          <View/>
        );
      }


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
