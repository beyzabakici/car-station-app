import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, Button, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import firebase from 'firebase';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function AddPostScreen({ navigation: { navigate } }) {
  const [postTitle, setPostTitle] = useState('');
  const [price, setPrice] = useState(null);
  const user = firebase.auth().currentUser;
  const location = useSelector( s => s.location);

  function handleSubmit() {
    firebase.database().ref('/posts/').push({
      title: postTitle ? postTitle : '',
      price: price ? price : 0 ,
      location: location,
      isActive: true,
      user_name: user.displayName,
      user_id: user.providerData[0].uid,
    })
    Alert.alert('success add post');
    navigate('MapScreen')
  }

  function handleReset() {
    setPrice(null);
    setPostTitle('');
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonBanner}>
      <TouchableOpacity
        style={styles.buttonRotate}
        onPress={() => navigate('MapScreen')}
      >
        <Icon name='chevron-left' color='tomato' size={50} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonRotate}
        onPress={() => navigate('ProfileScreen')}
      >
        <Icon name='chevron-right' color='tomato' size={50} />
      </TouchableOpacity>
      </View>
      <View style={styles.form}>
      <Text style={styles.title}>Add Post</Text>
      <Text style={styles.name}>{user.displayName}</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPostTitle}
        placeholder="post title"
        value={postTitle}
        />
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          onChangeText={setPrice}
          value={price}
          placeholder="price per second"
          keyboardType="numeric"
          />
        <Text style={styles.price}>₺</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleSubmit()}
        >
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      <Button
        title='Reset'
        color='tomato'
        onPress={() => handleReset()}
        />
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    borderRadius: 15,
    backgroundColor: '#fff',
  },
  buttonBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  form: {
    paddingTop: 40,

  },
  input: {
    margin: 10,
    padding: 15,
    paddingLeft: 15,
    paddingHorizontal: 8,
    borderColor: 'tomato',
    borderWidth: 1,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    marginTop: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  name: {
    textAlign: 'center',
    margin: 10,
  },
  inputWrapper: {
    position: 'relative',
  },
  price: {
    position: 'absolute',
    right: 25,
    top: 25,
    fontSize: 18,
  },
  button: {
    backgroundColor: 'tomato',
    padding: 15,
    borderRadius: 10,
    margin: 10,
    marginTop: 30
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    alignSelf: 'center'
  }
});