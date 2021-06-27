
import React from 'react';
import { SafeAreaView, ActivityIndicator, StyleSheet } from 'react-native';

export default function Loading() {
  return(
    <SafeAreaView style={styles.container}>
      <ActivityIndicator size='large'/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
})