//Imports
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { default as React, useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
//Screens
import { Friends } from './Friends';
import { Home } from './Home';
import { Notifications } from './Notifications';
import { Profile } from './Profile';
import { Settings } from './Settings';

const Tabs = createBottomTabNavigator();
const NotificationsStack = createStackNavigator();
const FriendsStack = createStackNavigator();
const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const SettingsStack = createStackNavigator();

const NotificationsStackScreen = () => {
  return (
    <NotificationsStack.Navigator>
      <NotificationsStack.Screen name="Avisos" component={Notifications} />
    </NotificationsStack.Navigator>
  );
}
const FriendsStackScreen = () => {
  return (
    <FriendsStack.Navigator>
      <FriendsStack.Screen name="Amigos" component={Friends} />
    </FriendsStack.Navigator>
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
const SettingsStackScreen = () => {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="Ajustes" component={Settings} />
    </SettingsStack.Navigator>
  );
}

export const MainNavigator = () => {
  return (
    <Tabs.Navigator initialRouteName="Inicio">
      <Tabs.Screen
        name="Avisos"
        component={NotificationsStackScreen}
        options={{
          tabBarLabel: 'Avisos',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bell" color={color} size={size - 2} />
          ),
        }}
      />
      <Tabs.Screen
        name="Amigos"
        component={FriendsStackScreen}
        options={{
          tabBarLabel: 'Amigos',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5Icon name="user-friends" color={color} size={size - 5} />
          ),
        }}
      />
      <Tabs.Screen
        name="Inicio"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Inicio',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size + 3} />
          ),
        }}
      />
      <Tabs.Screen
        name="Perfil"
        component={ProfileStackScreen}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size + 2} />
          ),
        }}
      />
      <Tabs.Screen
        name="Ajustes"
        component={SettingsStackScreen}
        options={{
          tabBarLabel: 'Ajustes',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-sharp" color={color} size={size - 2} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}