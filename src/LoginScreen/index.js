import React, { Component } from 'react';
import { KeyboardAvoidingView, TouchableOpacity, Image, ScrollView, StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Styles from '../styles';
import { Container, Header, Content, Form, Item, Picker, Label, Input, Text, Button} from 'native-base';
import { onSignIn } from "../../auth";

class LoginScreen extends Component {

	constructor(props){
		super(props);
		this.ref=null
		this.state = {
			username: '',
			password: ''
		}
	}

	setUsername(username){
		this.setState({
			username: username
		})
	}

	setPassword(password){
		this.setState({
			password: password
		})
	}

	render() {
		const { username, password } = this.state;
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
							onChangeText={ (value) => this.setUsername(value)}
						    blurOnSubmit={false}
						    value={username}
						    clearButtonMode='while-editing'
						/>
					</Item>
					<Item floatingLabel style={Styles.item} >
						<Label>Password</Label>
						<Input
							getRef={input => {
						      this.ref = input;
						    }}
						    value={password}
						    onChangeText={ (value) => this.setPassword(value)}
						    returnKeyType = {"next"}
						    type="password"
						    secureTextEntry={true}
						    onSubmitEditing={() => { onSignIn(username, password) }}
						/>
					</Item>
					<Button block style={Styles.loginButton} onPress={() => { onSignIn(username, password, this.props.navigation) }}>
						<Text>Login</Text>
					</Button>
					</Form>
				</ScrollView>
		    </KeyboardAvoidingView>
		);
	}
}

export default LoginScreen;
