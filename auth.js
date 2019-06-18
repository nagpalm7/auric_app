import { AsyncStorage } from "react-native";
import axios from 'axios';

export const USER_KEY = "token";
export const USER = "user";

export const onSignIn = (username, password, navigation) => {
  console.log('Sign In with ', username, password)
  axios.post('http://192.168.43.55:8000/api-token-auth/', {
    username: username,
    password: password
  })
  .then((res)=>{
    if(res.data.token){
      console.log('token',res.data);
      AsyncStorage.setItem(USER_KEY, res.data.token);
      axios.get('http://192.168.43.55:8000/api/get-user/', {
      headers: {
            Authorization: 'Token ' + res.data.token //the token is a variable which holds the token
        }
      })
      .then((res)=>{
        AsyncStorage.setItem(USER, res.data);
        console.log(res.data)
        navigation.navigate('SignedInAdmin')
      })
      .catch((err)=>{
        console.log('error', err);
      });
    }else{
      AsyncStorage.setItem(USER_KEY, null);
    }
  })
  .catch((err)=>{
    console.log('error', err);
  });
};

export const onSignOut = () => AsyncStorage.removeItem(USER_KEY);

export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(USER_KEY)
      .then(res => {
        if (res !== null) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(err => reject(err));
  });
};