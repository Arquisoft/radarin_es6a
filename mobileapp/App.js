import { StatusBar } from 'expo-status-bar';

import React, {Component,useState, useEffect} from 'react';
import { StyleSheet, Button,Text,View,Alert,TouchableOpacity } from 'react-native';
import * as Location from "expo-location";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import './react-leaflet.css';
import 'leaflet/dist/leaflet.css';


export default function App() {

  const [position, setPosition] = useState(null);

  const getPosition = async () => {
    try {
      const { coords } = await Location.getCurrentPositionAsync({});
      setPosition(coords);
    } catch (error) {
      console.log("getPosition -> error", error);
      setPosition(null);
    }
  };

  const entryPoint = async () => {
    try {
      const { status } = await Location.requestPermissionsAsync();
      if (status === "granted") {
        getPosition();
      }
    } catch (error) {
      console.log("getPermissionAndPosition -> error", error);
    }
  };

  useEffect(() => {
    entryPoint();
  }, []);

  return (

  <View style={styles.container}>
{(position && (
      <View>
        
        
      
        <View>
   
    <MapContainer className= 'leaflet-container'  center={[position.latitude,position.longitude]} zoom={20} scrollWheelZoom={false}>
  <TileLayer
    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Marker position={[position.latitude,position.longitude]}>
    <Popup>
     Estoy aquí
    </Popup>
  </Marker>
</MapContainer>

</View>



      </View>

     


    )) || (
      <View>
        <Text>GPS Unavailable</Text>
      </View>
    )}


</View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
