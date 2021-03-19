import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TapGestureHandler } from 'react-native-gesture-handler';
import { Home, Profile, Geo } from './screens/BasicScreens'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tabs = createBottomTabNavigator();
const GeoStack = createStackNavigator();
const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator();

const GeoStackScreen = () => {
  return (
    <GeoStack.Navigator>
      <GeoStack.Screen name="Geolocalización" component={Geo} />
    </GeoStack.Navigator>
  );
}

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Inicio" component={Home} />
    </HomeStack.Navigator>
  );
}

const ProfileStackScreen = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="Perfil" component={Profile} />
    </ProfileStack.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Tabs.Navigator initialRouteName="Inicio">
          <Tabs.Screen
            name="Geo"
            component={GeoStackScreen}
            options={{
              tabBarLabel: 'Geo',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="earth" color={color} size={size} />
              ),
            }}
          />
          <Tabs.Screen
            name="Inicio"
            component={HomeStackScreen}
            options={{
              tabBarLabel: 'Inicio',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="home" color={color} size={size} />
              ),
            }}
          />
          <Tabs.Screen
            name="Perfil"
            component={ProfileStackScreen}
            options={{
              tabBarLabel: 'Perfil',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="account" color={color} size={size} />
              ),
            }}
          />
        </Tabs.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }, main: {
    flex: 7,
    backgroundColor: '#ddd',
    borderColor: '#000',
    borderBottomWidth: 2
  }, buttons: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  }
});
