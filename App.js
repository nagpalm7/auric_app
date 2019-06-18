import React from "react";
import { View, Image, StatusBar, AsyncStorage } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { RootNavigator } from "./router";
import { isSignedIn, USER_KEY, USER } from "./auth";

import axios from 'axios';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: false,
      typeOfUser: null,
      checkedSignIn: false
    };
  }

  async componentDidMount() {
  	isSignedIn()
      .then(async res => {
      	await this.getUser();
      	this.setState({ 
        	signedIn: res, 
        	checkedSignIn: true,
        })
      })
      .catch(err => alert("An error occurred"));
  	console.log(this.state)
  }

  async getUser(){
  	let token = null
  	await AsyncStorage.getItem(USER_KEY)
  		.then(res => {
  			token = res;
  		})
  		.catch(err => console.log(err));
	if(token !== null){
		axios.get('http://192.168.43.55:8000/api/get-user/', {
			headers: {
			   		Authorization: 'Token ' + token //the token is a variable which holds the token
				}
    	})
    	.then((res)=>{
    	  this.setState({typeOfUser: res.data.typeOfUser})
    	  AsyncStorage.setItem(USER, res.data);
    	})
    	.catch((err)=>{
    	  console.log('error', err);
    	});
	}else{
		this.setState({
			typeOfUser: null
		})
	}
  }

  render() {
    const { checkedSignIn, signedIn, typeOfUser } = this.state;
    // If we haven't checked AsyncStorage yet, don't render anything (better ways to do this)
    // Splashscreen
    if (!checkedSignIn) {
      return(
      		<View style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'#000'}}>
      			<StatusBar backgroundColor="#cd9930" barStyle="light-content" />
      			<Image
					source={require('./src/assets/img/logo.png')}
				/>
      		</View>
      	)
    }
    // switch between login screen and app(admin and employee side)
    const App = createAppContainer(RootNavigator(signedIn,typeOfUser));
    return <App />;
  }
}