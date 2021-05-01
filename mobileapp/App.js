import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { default as React, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-community/picker';
import { data } from './screens/scripts/UserData';
import { ProfileLoadHandleLogout } from './screens/Profile';
import { log } from './screens/scripts/Log';
import { MainNavigator } from './screens/MainNavigator';
import { Chat } from './screens/Chat';

const Stack = createStackNavigator();

var btnLogIn = true;

class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 0,
      init: false,
      logged: false,
      logging: false,
      user: "",
      password: "",
      idp: "https://inrupt.net",
      error: false
    };
    this.handleLogIn = this.handleLogIn.bind(this);
    this.handlePicker = this.handlePicker.bind(this);
    data.init(this.handleInit.bind(this));
    ProfileLoadHandleLogout(this.reload.bind(this));
  }
  async handlePicker(itemValue, itemIndex) {
    this.setState({ idp: itemValue });
  }
  async handleLogIn() {
    if (btnLogIn) {
      btnLogIn = false;
      this.setState({ logging: true });
      this.setState({ error: false });
      var res = await data.user.logIn(this.state.idp, this.state.user, this.state.password);
      this.setState({ logged: res });
      if (this.state.logged) {
        this.setState({ user: "" });
        this.setState({ password: "" });
        this.setState({ error: false });
      } else {
        this.setState({ error: true });
      }
      btnLogIn = true;
      this.setState({ logging: false });
    }
  }
  async handleInit() {
    this.setState({ logged: data.user.logged });
    this.setState({ init: true });
  }
  async reload() {
    log("Recargando aplicacion");
    this.setState({ number: this.state.number + 1 });
  }
  render() {
    if (!this.state.init)
      return (
        <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text style={{ fontSize: 18 }}>Cargando aplicación...</Text>
        </SafeAreaView>);
    if (!data.user.logged)
      return this.logIn();
    else
      return this.menu();
  }
  menu() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Main">
            <Stack.Screen name="Main" component={MainNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="Chat" component={Chat}
              options={({ route }) => ({
                title: route.params.friend.username
              })}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    );
  }
  logIn() {
    return (
      <SafeAreaView style={styles.container}>
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
        <View style={styles.inputView} >
          <Picker
            selectedValue={this.state.idp}
            onValueChange={(itemValue, itemIndex) => { this.handlePicker(itemValue, itemIndex) }}>
            <Picker.Item label="Inrupt" value="https://inrupt.net" />
            <Picker.Item label="Solid Community" value="https://solidcommunity.net" />
          </Picker>
        </View>
        <View style={styles.errorView} >
          <Text style={styles.error}>{this.state.error ? "El usuario o la contraseña son incorrectos" : ""}</Text>
        </View>
        <TouchableOpacity style={styles.loginBtn} onPress={this.handleLogIn}>
          <Text style={styles.loginText}>{this.state.logging ? "Iniciando..." : "Iniciar Sesión"}</Text>
        </TouchableOpacity>
      </SafeAreaView>
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
    fontSize: 16,
    color: "white"
  },
  errorView: {
    width: "80%"
  },
  error: {
    fontSize: 14,
    color: "red",
    textAlign: 'center'
  }
});