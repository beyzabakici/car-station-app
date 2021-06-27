import React from 'react';
import { SafeAreaView, Button, Text, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import firebase from 'firebase';

export default function ProfileScreen() {
  const user = firebase.auth().currentUser;
  return(
    <SafeAreaView style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <Image  style={{height: 100, width: 100}} source={{ uri: user.photoURL }} />
      <Text>{user.displayName}</Text>
        <Button 
        title='Sing Out' 
        onPress={() => firebase.auth().signOut()}
      />
    </SafeAreaView>
  );
}