import React, { Component } from 'react';
import { AsyncStorage, KeyboardAvoidingView, ScrollView, View, TouchableOpacity, StatusBar } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body, Right, Left} from 'native-base';
import { onSignOut, USER_KEY, USER } from "../../auth";
import { withNavigationFocus } from "react-navigation";
import Icon from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import Styles from '../styles';

class Submissions extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: "My Submissions",
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
            data: [],
            busy: true,
        }
    }

    componentDidUpdate(prevProps) {
        console.log('try')
        if (prevProps.isFocused !== this.props.isFocused) {
          // Use the `this.props.isFocused` boolean
          // Call any action
          console.log('try success')
          this.fetch();
        }
      }

    componentDidMount(){
        this.fetch();
    }

    async fetch(){
        let token = null
        await AsyncStorage.getItem(USER_KEY)
            .then(res => {
                token = res;
            })
            .catch(err => console.log(err));
        await axios.get('http://192.168.43.55:8000/api/form/?myOnly=true', {
            headers: {
            Authorization: 'Token ' + token //the token is a variable which holds the token
            },
          })
          .then(async (res)=>{
            let data = res.data;
            console.log(data)
            if(data.length > 0){
                for(var i=0; i<data.length; i++){
                    await axios.get(data[i].user,{
                        headers: {
                        Authorization: 'Token ' + token //the token is a variable which holds the token
                        },
                    })
                    .then(res=>{
                        console.log(data, i)
                        data[i].user = res.data;
                    }).catch(err=>{
                        console.log(err);
                    })
                }
            }
            this.setState({
                data: data,
                busy: false,
            })
          })
          .catch((err)=>{
            console.log('error', err);
          });
    }

    render() {
        return (
            <Container style={Styles.container}>
                <StatusBar backgroundColor="#d0a44c" barStyle="light-content" />
                <Content>
                  {
                    this.state.data.map(item=>{
                        return(
                                <Card button onPress={()=> alert("yipiee")} key={this.state.data.indexOf(item)}>
                                    <CardItem header style={{paddingBottom: 0}}>
                                      <Text>{item.user.name}</Text>
                                    </CardItem>
                                    <CardItem>
                                        <Left>
                                            <Text>
                                              Sales:- {item.sales}
                                            </Text>
                                            <Text>
                                              {item.location}, {item.city}
                                            </Text>
                                        </Left>
                                        <Right>
                                            <Icon name="edit" style={{color:"#d0a44c", fontSize:20}}/>
                                        </Right>
                                    </CardItem>
                                  </Card>
                            )
                    })
                  }
                </Content>
            </Container>
        );
    }
}

export default withNavigationFocus(Submissions);
