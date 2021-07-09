import React from 'react';
import { SafeAreaView, Button } from 'react-native';
import * as Google from 'expo-google-app-auth';
import firebase from 'firebase';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch } from 'react-redux';

export default function LoginScreen() {
  const dispatch = useDispatch();

  const isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  }

  const onSignIn = (googleUser) => {
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
      unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.
      if (!isUserEqual(googleUser, firebaseUser)) {
        // Build Firebase credential with the Google ID token.
        var credential = firebase.auth.GoogleAuthProvider.credential(
          googleUser.idToken,
          googleUser.accessToken
        );
        // Sign in with credential from the Google user.
        firebase.auth().signInWithCredential(credential).then((result) => {
          const dbRef = firebase.database().ref();
          dbRef.child("users").child(result.user.uid).get().then((snapshot) => {
            if (snapshot.email === result.user.email) {
              console.log('user already exists'+ snapshot.val());
              return;

            } else {
              firebase.database().ref('/users/' + result.user.uid).set({
                gmail: result.user.email,
                profile_picture: result.additionalUserInfo.profile.picture,
                locale: result.additionalUserInfo.profile.locale,
                first_name: result.additionalUserInfo.profile.given_name,
                last_name: result.additionalUserInfo.profile.family_name
              })
            }
          }).catch((error) => {
            console.error(error);
          });
        })
      } else {
        console.log('User already signed-in Firebase.');
      }
    });
  }

  const signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        iosClientId: '369936574538-315qabo1mbcob82obiolndgeattrfgup.apps.googleusercontent.com',
      });
      if (result.type === 'success') {
        onSignIn(result);
        return result.accessToken;
      }
    } catch (e) {
      return { error: true };
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Icon name='toy-brick-search' color='tomato' size={50} />
      <Button
        color='tomato'
        title='Sing In With Google'
        onPress={() => signInWithGoogleAsync()}
      />
    </SafeAreaView>
  );
}