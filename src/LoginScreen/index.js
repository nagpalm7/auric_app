import React, { Component } from 'react';
import { KeyboardAvoidingView, TouchableOpacity, Image, ScrollView, StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Styles from '../styles';
import { Container, Header, Content, Form, Item, Picker, Label, Input, Text, Button} from 'native-base';

class LoginScreen extends Component {

	constructor(props){
		super(props);
		this.ref=null
	}

	render() {
		console.log('refs', this.ref)
		return (
			<KeyboardAvoidingView  style={{flex:1, justifyContent:'center'}} behaviour='position' enabled>
				<StatusBar backgroundColor="#cd9930" barStyle="light-content" />
				<ScrollView contentContainerStyle={Styles.loginContainer}>
					<Image
						style={Styles.logo}
						source={require('../assets/img/logo.png')}
					/>
					<Form style={Styles.loginForm}>
						<Item floatingLabel style={Styles.item} >
							<Label>Username</Label>
						<Input 
							returnKeyType = {"next"}
							onSubmitEditing={() => { this.ref._root.focus(); }}
						    blurOnSubmit={false}
						/>
					</Item>
					<Item floatingLabel style={Styles.item} >
						<Label>Password</Label>
						<Input
							getRef={input => {
						      this.ref = input;
						    }}
						    returnKeyType = {"next"}
						    type="password"
						    onSubmitEditing={() => { console.log('tada') }}
						/>
					</Item>
					<Button block style={Styles.loginButton}>
						<Text>Login</Text>
					</Button>
					</Form>
				</ScrollView>
		    </KeyboardAvoidingView>
		);
	}
}

export default LoginScreen;
