import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useDispatch } from 'react-redux';
import Loading from '../components/Loading';
import firebase from 'firebase';

export default function MapScreen() {
  const dispatch = useDispatch();

  const [currentLocation, setCurrentLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const dbRef = firebase.database().ref('posts/');
    dbRef.orderByValue().on("value", function(snapshot) {
    console.log(snapshot.val());
    snapshot.forEach(function(data) {
      dispatch({ type: 'ADD_POST', payload:{ post: data }});
    });
    });

    setLoading(true);
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location.coords);
      dispatch({ type: 'ADD_LOCATION', payload: { location: location.coords } });
      setLoading(false);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  }

  return (
    <SafeAreaView style={styles.container} >
      {!isLoading && currentLocation
        ? <MapView
          provider={PROVIDER_GOOGLE}
          style={{ flex: 1 }}
          initialRegion={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}>
          {/* <Marker coordinate={coordDolmabahce} />   */}
        </MapView>
        : <Loading />
      }
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});