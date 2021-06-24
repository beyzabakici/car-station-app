import React, { Profiler } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { MainMap, Profile } from './app/pages';

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
        activeTintColor: '#f8792b',
        inactiveTintColor: '#bdbdbd',
      }}
    >
      <Tab.Screen name="Map" component={MainMap} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  )
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ header: () => null }}>
        <Stack.Screen name="App" component={AppStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


function generateIcon(color, route) {
  let iconName;

  switch (route.name) {
    case 'Map':
      iconName = 'map-outline';
      break;
    case 'Profile':
      iconName = 'account';
      break;

    default:
      break;
  }

  return <Icon name={iconName} color={color} size={30} />
};

export default App;