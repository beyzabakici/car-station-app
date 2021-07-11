import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


import AppProvider from './src/context/Provider'

import LoadingScreen from './src/pages/LoadingScreen';
import MapScreen from './src/pages/MapScreen';
import ProfileScreen from './src/pages/ProfileScreen';
import LoginScreen from './src/pages/LoginScreen';
import AddPostScreen from './src/pages/AddPostScreen';

import firebase from 'firebase';
import { firebaseConfig } from './config';
firebase.initializeApp(firebaseConfig);

  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

function AppStack() {
  return (
    <Tab.Navigator
      initialRouteName="Main"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) =>
          generateIcon(color, route),
        tabBarLabel: () => null,
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: '#ccc',
      }}
    >
      <Tab.Screen name="MapScreen" component={MapScreen} />
      <Tab.Screen name="AddPostScreen" component={AddPostScreen} />
      <Tab.Screen name="ProfileScreen" component={ProfileScreen} />
    </Tab.Navigator>
  )
}

function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ header: () => null }}>
          <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="AppStack" component={AppStack} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}


function generateIcon(color, route) {
  let iconName;

  switch (route.name) {
    case 'MapScreen':
      iconName = 'map-outline';
      break;
    case 'ProfileScreen':
      iconName = 'account';
      break;
    case 'AddPostScreen':
      iconName = 'plus';
      break;

    default:
      break;
  }

  return <Icon name={iconName} color={color} size={30} />
};

export default App;