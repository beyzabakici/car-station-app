import React, { useEffect } from 'react';
import { ActivityIndicator, SafeAreaView } from 'react-native';
import firebase from 'firebase';

export default function LoadingScreen(props) {
  useEffect(() => {
    checkIfLoggedIn();
  },[]);

  checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        props.navigation.navigate('MapScreen');
      } else {
        props.navigation.navigate('LoginScreen');
      }
    });
  }

  return(
    <SafeAreaView style={{ flex:1, alignItems: "center", justifyContent: "center"}}>
      <ActivityIndicator size='large'/>
    </SafeAreaView>
  );
}