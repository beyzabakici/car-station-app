import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import LoadingScreen from './src/pages/LoadingScreen';
import firebase from 'firebase';
import { firebaseConfig } from './config';
import MapScreen from './src/pages/MapScreen';
import ProfileScreen from './src/pages/ProfileScreen';
import LoginScreen from './src/pages/LoginScreen';
firebase.initializeApp(firebaseConfig);

const AppSwitchNavigator = createSwitchNavigator({
  LoadingScreen: LoadingScreen,
  LoginScreen: LoginScreen,
  ProfileScreen: ProfileScreen,
  MapScreen: MapScreen,

});

const AppNavigator = createAppContainer(AppSwitchNavigator); 

function App() {
  return (
    <AppNavigator />
  );
}

export default App;