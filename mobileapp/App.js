//Imports
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { default as React, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TextInput, TouchableOpacity, Button } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { data } from './screens/scripts/UserData';
//Screens
import { Friends } from './screens/Friends';
import { Home } from './screens/Home';
import { Notifications } from './screens/Notifications';
import { Profile } from './screens/Profile';
import { Settings } from './screens/Settings';

data.init();

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

class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logged: data.user.logged,
      user: "",
      password: "",
      idp: "https://inrupt.net"
    };
    this.handleLogIn = this.handleLogIn.bind(this);
  }
  async handleLogIn() {
    var res = await data.user.logIn(this.state.idp, this.state.user, this.state.password);
    this.setState({ logged: res });
  }
  render() {
    if (!this.state.logged)
      return this.logIn();
    else
      return this.menu();
  }
  menu() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer>
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
        </NavigationContainer>
      </SafeAreaView>
    );
  }
  logIn() {
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>Radarin</Text>
        <View style={styles.inputView} >
          <TextInput
            style={styles.inputText}
            placeholder="Usuario"
            keyboardType='default'
            placeholderTextColor="#aaa"
            disabled={false}
            onChangeText={text => { this.setState({ user: text }) }} />
        </View>
        <View style={styles.inputView} >
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="Contraseña"
            placeholderTextColor="#aaa"
            onChangeText={text => { this.setState({ password: text }) }} />
        </View>
        <TouchableOpacity style={styles.loginBtn} onPress={this.handleLogIn}>
          <Text style={styles.loginText}>Iniciar Sesión</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default function App() {
  return (<Application />);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontWeight: "bold",
    fontSize: 60,
    color: "#0272E9",
    marginBottom: 50
  },
  inputView: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 25,
    borderColor: "#111",
    borderWidth: 1,
    elevation: 5,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20
  },
  inputText: {
    fontSize: 16,
    height: 50,
    color: "black"
  },
  loginBtn: {
    width: "60%",
    backgroundColor: "#047cfc",
    borderRadius: 25,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    marginBottom: 10
  },
  loginText: {
    fontSize: 18,
    color: "white"
  }
});