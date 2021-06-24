import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import MapView, { PROVIDER_DEFAULT } from 'react-native-maps';

export default function MapScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}
    >
      <MapView
        provider={PROVIDER_DEFAULT}
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 41.0391643,
          longitude: 28.9982707,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    </SafeAreaView>

  );
}