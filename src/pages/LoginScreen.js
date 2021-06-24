import React from 'react';
import { SafeAreaView, Text, Button } from 'react-native';

export default function LoginScreen() {

  const signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        //androidClientId: YOUR_CLIENT_ID_HERE,
        behavior: 'web',
        iosClientId: '369936574538-lon0i5se566330f6080f2iqrc26dsq8g.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });
  
      if (result.type === 'success') {
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  }

  return(
    <SafeAreaView style={{ flex:1, alignItems: "center", justifyContent: "center"}}>
      <Button 
        title='Sing In With Google' 
        onPress={() => signInWithGoogleAsync()}
      />
    </SafeAreaView>
  );
}