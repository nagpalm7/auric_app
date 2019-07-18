import React, { Component } from 'react';
import ReactNative, { AsyncStorage, KeyboardAvoidingView, ScrollView, View, TouchableOpacity, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Styles from '../styles';
import ImagePicker from 'react-native-image-crop-picker';
import { Container, Header, Button, Text, Content, Form, Item, Picker, Input, Label, Toast } from 'native-base';
import { onSignOut, USER_KEY, USER, USER_NAME } from "../../auth";
import axios from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

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
            user:'',
            location:'...',
            city:'...',
            mind_o:'',
            body_o:'',
            skin_o:'',
            multipack_o:'',
            mind_c:'',
            body_c:'',
            skin_c:'',
            multipack_c:'',
            jumboCombos:'',
            name:''
        }
    }

    componentDidMount(){
        this.getInitialData();
    }

    async getInitialData(){
        const user = await AsyncStorage.getItem(USER);
        const name = await AsyncStorage.getItem(USER_NAME);
        this.setState({ user, name})
    }

    selectImages(){
        ImagePicker.openPicker({
          multiple: true
        }).then(images => {
          console.log(images);
        });
    }

    validateData(){
        this.selectImages();
        if( this.state.city === '...' || 
            this.state.location === '...' ||
            this.state.mind_o === '' || 
            this.state.body_o === '' ||
            this.state.skin_o === '' ||
            this.state.multipack_o === '' ||
            this.state.mind_c === '' || 
            this.state.body_c === '' ||
            this.state.skin_c === '' ||
            this.state.multipack_c === '' ||
            this.state.jumboCombos === ''
        ){
            Toast.show({
                text: "Please fill in the form.",
                buttonText: "Okay",
                duration: 2000
              })
            return false
        }else{
            return true
        }
    }

    async submitForm(){
        const data = {
            "city": this.state.city,
            "location": this.state.location,
            "mind_o": parseInt(this.state.mind_o),
            "body_o": parseInt(this.state.body_o),
            "skin_o": parseInt(this.state.skin_o),
            "multipack_o": parseInt(this.state.multipack_o),
            "mind_c": parseInt(this.state.mind_c),
            "body_c": parseInt(this.state.body_c),
            "skin_c": parseInt(this.state.skin_c),
            "multipack_c": parseInt(this.state.multipack_c),
            "jumbo_combos": parseInt(this.state.jumboCombos),
            "user": this.state.user
        }
        console.log(data)
        let token = null
        await AsyncStorage.getItem(USER_KEY)
            .then(res => {
                token = res;
            })
            .catch(err => console.log(err));
        axios.post('http://192.168.43.55:8000/api/form/', data, {
            headers: {
            Authorization: 'Token ' + token //the token is a variable which holds the token
            },
          })
          .then((res)=>{
            console.log(res)
          })
          .catch((err)=>{
            console.log('error', err);
          });
    }

    async handleSubmit(){
        if(this.validateData()){
            this.submitForm();
        }
    }

    _scrollToInput (reactNode: any) {
      // Add a 'scroll' ref to your ScrollView
      this.scroll.props.scrollToFocusedInput(reactNode)
    }

    render() {
        return (
            <View style={Styles.container}>
                <StatusBar backgroundColor="#d0a44c" barStyle="light-content" />
                <View>
                    <KeyboardAwareScrollView
                    innerRef={ref => {
                    this.scroll = ref
                  }}
                  extraScrollHeight={50}
                  >
                  <Form>
                    <Item picker>
                      <Picker
                        mode="dropdown"
                        iosIcon={<Icon name="arrow-down" />}
                        style={{ width: undefined }}
                        placeholderStyle={{ color: "#bfc6ea" }}
                        placeholderIconColor="#007aff"
                        selectedValue={this.state.user}
                        disabled
                      >
                        <Picker.Item label={this.state.name} value={this.state.user} />
                      </Picker>
                    </Item>
                    <Item picker style={{marginTop:4}}>
                      <Picker
                        mode="dropdown"
                        iosIcon={<Icon name="arrow-down" />}
                        style={{ width: undefined }}
                        placeholderStyle={{ color: "#bfc6ea" }}
                        placeholderIconColor="#007aff"
                        selectedValue={this.state.city}
                        onValueChange={(city)=>{ this.setState({city}) }}
                      >
                        <Picker.Item label="City" value="..." />
                        <Picker.Item label="Tricity" value="Tricity" />
                        <Picker.Item label="Delhi" value="Delhi" />
                      </Picker>
                    </Item>
                    <Item picker style={{marginTop:4}}>
                      <Picker
                        mode="dropdown"
                        iosIcon={<Icon name="arrow-down" />}
                        style={{ width: undefined }}
                        placeholderStyle={{ color: "#bfc6ea" }}
                        placeholderIconColor="#007aff"
                        selectedValue={this.state.location}
                        onValueChange={(location)=>{ this.setState({location}) }}
                      >
                        <Picker.Item label="Location" value="..." />
                        <Picker.Item label="Tricity" value="Tricity" />
                        <Picker.Item label="Delhi" value="Delhi" />
                      </Picker>
                    </Item>
                    <Text style={Styles.formLabel}>Opening Stock</Text>
                    <Item floatingLabel style={Styles.formItem} >
                        <Label>Mind Bottles</Label>
                        <Input 
                            value={this.state.mind_o}
                            onSubmitEditing={()=>{
                                this._scrollToInput(ReactNative.findNodeHandle(this.skin_o))
                                this.body_o._root.focus();
                            }}
                            returnKeyType = {"next"}
                            blurOnSubmit={false}
                            keyboardType='numeric'
                            onChangeText={mind_o => this.setState({mind_o})}
                        />
                    </Item>
                    <Item floatingLabel style={Styles.formItem} >
                        <Label>Body Bottles</Label>
                        <Input 
                            getRef={ref => {this.body_o = ref;}}
                            value={this.state.body_o}
                            onSubmitEditing={()=>{
                                this._scrollToInput(ReactNative.findNodeHandle(this.multipack_o))
                                this.skin_o._root.focus();
                            }}
                            returnKeyType = {"next"}
                            blurOnSubmit={false}
                            keyboardType='numeric'
                            onChangeText={body_o => this.setState({body_o})}
                        />
                    </Item>
                    <Item floatingLabel style={Styles.formItem} >
                        <Label>Skin Bottles</Label>
                        <Input 
                            getRef={ref => {this.skin_o = ref}}
                            value={this.state.skin_o}
                            onSubmitEditing={()=>{
                                this._scrollToInput(ReactNative.findNodeHandle(this.mind_c))
                                this.multipack_o._root.focus();
                            }}
                            returnKeyType = {"next"}
                            blurOnSubmit={false}
                            keyboardType='numeric'
                            onChangeText={skin_o => this.setState({skin_o})}
                        />
                    </Item>
                    <Item floatingLabel style={Styles.formItem} >
                        <Label>Multipack Bottles</Label>
                        <Input 
                            getRef={ref => (this.multipack_o = ref)}
                            value={this.state.multipack_o}
                            onSubmitEditing={()=>{
                                this._scrollToInput(ReactNative.findNodeHandle(this.body_c))
                                this.mind_c._root.focus();
                            }}
                            returnKeyType = {"next"}
                            blurOnSubmit={false}
                            keyboardType='numeric'
                            onChangeText={multipack_o => this.setState({multipack_o})}
                        />
                    </Item>
                    <Text style={Styles.formLabel}>Closing Stock</Text>
                    <Item floatingLabel style={Styles.formItem} >
                        <Label>Mind Bottles</Label>
                        <Input 
                            getRef={ref => (this.mind_c = ref)}
                            value={this.state.password}
                            onSubmitEditing={()=>{
                                this._scrollToInput(ReactNative.findNodeHandle(this.skin_c))
                                this.body_c._root.focus();
                            }}
                            returnKeyType = {"next"}
                            blurOnSubmit={false}
                            keyboardType='numeric'
                            onChangeText={mind_c => this.setState({mind_c})}
                        />
                    </Item>
                    <Item floatingLabel style={Styles.formItem} >
                        <Label>Body Bottles</Label>
                        <Input 
                            getRef={ref => (this.body_c = ref)}
                            value={this.state.body_c}
                            onSubmitEditing={()=>{
                                this._scrollToInput(ReactNative.findNodeHandle(this.multipack_c))
                                this.skin_c._root.focus();
                            }}
                            returnKeyType = {"next"}
                            blurOnSubmit={false}
                            keyboardType='numeric'
                            onChangeText={body_c => this.setState({body_c})}
                        />
                    </Item>
                    <Item floatingLabel style={Styles.formItem} >
                        <Label>Skin Bottles</Label>
                        <Input 
                            getRef={ref => (this.skin_c = ref)}
                            value={this.state.skin_c}
                            onSubmitEditing={()=>{
                                this._scrollToInput(ReactNative.findNodeHandle(this.jumboCombos))
                                this.multipack_c._root.focus();
                            }}
                            returnKeyType = {"next"}
                            blurOnSubmit={false}
                            keyboardType='numeric'
                            onChangeText={skin_c => this.setState({skin_c})}
                        />
                    </Item>
                    <Item floatingLabel style={Styles.formItem} >
                        <Label>Multipack Bottles</Label>
                        <Input 
                            getRef={ref => (this.multipack_c = ref)}
                            value={this.state.multipack_c}
                            onSubmitEditing={()=>{
                                this._scrollToInput(ReactNative.findNodeHandle(this.button))
                                this.jumboCombos._root.focus();
                            }}
                            returnKeyType = {"next"}
                            blurOnSubmit={false}
                            keyboardType='numeric'
                            onChangeText={multipack_c => this.setState({multipack_c})}
                        />
                    </Item>
                    <Text style={Styles.formLabel}>How many jumbopacks have you sold?</Text>
                    <Item style={Styles.formItem} >
                        <Input 
                            value={this.state.jumboCombos}
                            ref={ref => (this.jumboCombos = ref)}
                            returnKeyType = {"done"}
                            onSubmitEditing={()=>{
                                this.handleSubmit()
                            }}
                            blurOnSubmit={false}
                            keyboardType='numeric'
                            onChangeText={jumboCombos => this.setState({jumboCombos})}
                        />
                    </Item>
                    <Button block ref={ref => (this.button = ref)} style={Styles.loginButton} onPress={() => { this.handleSubmit() }}>
                        <Text>Submit</Text>
                    </Button>
                  </Form>
                  </KeyboardAwareScrollView>
                </View>
              </View>
        );
    }
}

export default FormTab;

const options = {
  title: 'Select Images',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};