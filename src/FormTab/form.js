import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Styles from '../styles';
import { Container, Header, Content, Form, Item, Picker } from 'native-base';

class FormTab extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: "Form",
        headerLeft: (
            <TouchableOpacity
                style={Styles.headerButton}
                onPress={() => navigation.openDrawer()}>
                <Icon name="bars" size={20} style={{color:"#fff"}}/>
            </TouchableOpacity>
        ),
        headerStyle:{
            backgroundColor: "#008080",
            color:"#fff"
        },
        headerTitleStyle:{
            color:"#fff"
        }

    })
    render() {
        return (
            <Container style={Styles.container}>
                <Content>
                  <Form>
                    <Item picker>
                      <Picker
                        mode="dropdown"
                        iosIcon={<Icon name="arrow-down" />}
                        style={{ width: undefined }}
                        placeholderStyle={{ color: "#bfc6ea" }}
                        placeholderIconColor="#007aff"
                        
                      >
                        <Picker.Item label="Name" value="..." />
                        <Picker.Item label="Mohit Nagpal" value="key1" />
                        <Picker.Item label="Chahat Goyal" value="key2" />
                        <Picker.Item label="Diksha Sharma" value="key3" />
                        <Picker.Item label="Shrey Rohatgi" value="key4" />
                      </Picker>
                    </Item>
                    <Item picker style={{marginTop:4}}>
                      <Picker
                        mode="dropdown"
                        iosIcon={<Icon name="arrow-down" />}
                        style={{ width: undefined }}
                        placeholderStyle={{ color: "#bfc6ea" }}
                        placeholderIconColor="#007aff"
                      >
                        <Picker.Item label="City" value="..." />
                        <Picker.Item label="Tricity" value="key1" />
                        <Picker.Item label="Delhi" value="key2" />
                        <Picker.Item label="Gurgaon" value="key3" />
                      </Picker>
                    </Item>
                    <Item picker style={{marginTop:4}}>
                      <Picker
                        mode="dropdown"
                        iosIcon={<Icon name="arrow-down" />}
                        style={{ width: undefined }}
                        placeholderStyle={{ color: "#bfc6ea" }}
                        placeholderIconColor="#007aff"
                      >
                        <Picker.Item label="Location" value="..." />
                        <Picker.Item label="Tricity" value="key1" />
                        <Picker.Item label="Delhi" value="key2" />
                        <Picker.Item label="Gurgaon" value="key3" />
                      </Picker>
                    </Item>
                  </Form>
                </Content>
              </Container>
        );
    }
}

export default FormTab;
