import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, FlatList } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../components/Loading';
import firebase from 'firebase';

export default function MapScreen() {
  const dispatch = useDispatch();

  const [currentLocation, setCurrentLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const postList = useSelector(s => s.postList);

  useEffect(() => {
    const dbRef = firebase.database().ref('posts/');
    dbRef.orderByValue().on("value", function (snapshot) {
      snapshot.forEach((snapshotChild) => {
        dispatch({ type: 'ADD_POST', payload: { post: snapshotChild.val() } });
      })
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

  const handleMarker = (item) => {
    return item ? <Marker coordinate={ {latitude: item.location.latitude, longitude: item.location.longitude} }/> : null
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
          <FlatList
            data={postList}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({item}) =>              
              handleMarker(item)
            }
          />
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