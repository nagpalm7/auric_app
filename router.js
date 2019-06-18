import React from "react";
import { Platform, StatusBar } from "react-native";
import { createDrawerNavigator, createSwitchNavigator, createStackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Settings from './src/Settings';  //Tab Nav
import FormTab from './src/FormTab'; //Stack Nav
import LoginScreen from './src/LoginScreen'

const headerStyle = {
  marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
};

export const LoginNavigator = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      title: "Login",
      headerVisible:false
    }
  }
},{headerMode:"none",});

export const DrawerNavigator = createDrawerNavigator({
  Profile: {
    screen: FormTab,
    navigationOptions: {
      drawerLabel: 'Form',
      drawerIcon: ({ tintColor }) => <Icon name="user-circle" size={17} />,
    }
  }
});

export const RootNavigator = (signedIn = false) => {
  return createSwitchNavigator(
    {
      SignedIn: {
        screen: DrawerNavigator
      },
      SignedOut: {
        screen: LoginNavigator
      }
    },
    {
      initialRouteName: signedIn ? "SignedIn" : "SignedOut"
    }
  );
};

