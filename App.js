import React from "react";
import { View, Image, StatusBar } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { RootNavigator } from "./router";
import { isSignedIn } from "./auth";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      signedIn: false,
      checkedSignIn: false
    };
  }

  componentDidMount() {
  	console.log('app.js')
    isSignedIn()
      .then(res => this.setState({ signedIn: res, checkedSignIn: true }))
      .catch(err => alert("An error occurred"));
  }

  render() {
    const { checkedSignIn, signedIn } = this.state;

    // If we haven't checked AsyncStorage yet, don't render anything (better ways to do this)
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

    const App = createAppContainer(RootNavigator(signedIn));
    return <App />;
  }
}