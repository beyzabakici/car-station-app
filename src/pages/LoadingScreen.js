import React, { useEffect } from 'react';
import firebase from 'firebase';
import Loading from '../components/Loading';

export default function LoadingScreen(props) {
  useEffect(() => {
    checkIfLoggedIn();
  },[]);

  checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        props.navigation.navigate('AppStack');
      } else {
        props.navigation.navigate('LoginScreen');
      }
    });
  }

  return(
    <Loading />
  );
}