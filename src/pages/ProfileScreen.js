import React from 'react';
import { SafeAreaView, TouchableOpacity, Text, Image, StyleSheet, View, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import firebase from 'firebase';
import { useSelector } from 'react-redux';

export default function ProfileScreen() {
  const user = firebase.auth().currentUser;

  const handleSignOut = () => {
    firebase.auth().signOut();
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.signOutButton} onPress={() => handleSignOut()}>
        <Icon name='logout' color='tomato' size={30} />
      </TouchableOpacity>
      <View style={styles.profileArea}>
        <View style={styles.photoArea}>
          <Image style={styles.photo} source={{ uri: user.photoURL }} />
        </View>
        <Text style={styles.label}>{user.displayName}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    marginTop: 30,
    borderRadius: 15,
    backgroundColor: '#fff'
  },
  profileArea: {
    margin: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoArea: {
    backgroundColor: '#ccc',
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  photo: {
    borderRadius: 60,
    width: 100,
    height: 100
  },
  label: {
    fontSize: 18,
    padding: 10,
  },
  signOutButton: {
    alignItems: 'flex-end',
    margin: 10,
  }
});