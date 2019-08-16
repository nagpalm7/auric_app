import React, { Component } from 'react';
import { AsyncStorage, KeyboardAvoidingView, ScrollView, View, TouchableOpacity, StatusBar } from 'react-native';
import { Container, Content, Picker, Item, Form, Spinner, Button, Text } from 'native-base';
import { onSignOut, USER_KEY, USER } from "../../auth";
import { withNavigationFocus } from "react-navigation";
import Icon from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import Styles from '../styles';
import {base_url} from "../../base_url";

class Download extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: "Download Reports",
        headerLeft: (
            <TouchableOpacity
                style={Styles.headerButton}
                onPress={() => navigation.openDrawer()}>
                <Icon name="bars" size={20} style={{color:"#fff"}}/>
            </TouchableOpacity>
        ),
        headerStyle:{
            backgroundColor: "#cd9930",
            color:"#fff"
        },
        headerTitleStyle:{
            color:"#fff"
        }
    })

    constructor(props){
        super(props);
        this.state = {
            busy: false,
            month: '1',
            csv: null
        }
    }

    async handleSubmit(){
        let token;
        await AsyncStorage.getItem(USER_KEY)
            .then(res => {
                token = res;
            })
            .catch(err => console.log(err));
        this.setState({busy:true},()=>{
            axios.get(base_url + `/api/download-reports/?month=${this.state.month}`, {
                headers: {
                Authorization: 'Token ' + token //the token is a variable which holds the token
                },
              })
              .then(async (res)=>{
                let data = res.data;
                console.log(data)
                this.setState({
                    csv: csvFile,
                })
              })
              .catch((err)=>{
                console.log('error', err.response.data);
              });
        })
    }

    render() {
        return (
            <Container style={Styles.container}>
                <StatusBar backgroundColor="#d0a44c" barStyle="light-content" />
                <Content>
                <Form>
                    <Item picker>
                      <Picker
                        mode="dropdown"
                        iosIcon={<Icon name="arrow-down" />}
                        style={{ width: undefined }}
                        placeholderStyle={{ color: "#bfc6ea" }}
                        placeholderIconColor="#007aff"
                        selectedValue={this.state.month}
                        onValueChange={
                            (month)=>this.setState({month})
                        }
                      >
                        {
                            months.map(month=> <Picker.Item label={month.title} value={month.value} />)
                        }
                      </Picker>
                    </Item>
                </Form>
                <Button block disabled={this.state.busy} style={Styles.loginButton} onPress={() => { this.handleSubmit() }}>
                    <Text>Download CSV</Text>
                    {this.state.busy && <Spinner color="#fff" size={16}/>}
                </Button>
                </Content>
            </Container>
        );
    }
}

export default withNavigationFocus(Download);

const months = [
    {
        title: 'January',
        value: '1'
    },
    {
        title: 'February',
        value: '2'
    },
    {
        title: 'March',
        value: '3'
    },
    {
        title: 'April',
        value: '4'
    },
    {
        title: 'May',
        value: '5'
    },
    {
        title: 'June',
        value: '6'
    },
    {
        title: 'July',
        value: '7'
    },
    {
        title: 'August',
        value: '8'
    },
    {
        title: 'September',
        value: '9'
    },
    {
        title: 'October',
        value: '10'
    },
    {
        title: 'November',
        value: '11'
    },
    {
        title: 'December',
        value: '12'
    },
]