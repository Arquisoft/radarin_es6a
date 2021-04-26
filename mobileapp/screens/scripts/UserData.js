import PushNotification from "react-native-push-notification";
import { AppState } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { log } from './Log';
import { startBackgroundFunction } from './Background';
import uuid from 'react-native-uuid';

/**
 * Archivo que almacena toda la informacion relativa al usuario.
 */
export var data = {
    settings: {
        geolocation: false,
        notifications: true,
        geolocationTimeInterval: 5,
        updateGeolocation: async () => {
            try {
                await AsyncStorage.setItem('@settings-geolocation', JSON.stringify(data.settings.geolocation));
                log("Se ha actualizado el valor del ajuste de geolocalización.");
            } catch (e) {
                log("No se ha podido actualizar el valor del ajuste de geolocalización.");
            }
        },
        updateNotifications: async () => {
            try {
                await AsyncStorage.setItem('@settings-notifications', JSON.stringify(data.settings.notifications));
                log("Se ha actualizado el valor del ajuste de notificación.");
            } catch (e) {
                log("No se ha podido actualizar el valor del ajuste de notificación.");
            }
        }
    },
    server: {
        ip: '10.0.2.2',
        port: "5000"
    },
    user: {
        id: null,
        updateId: async () => {
            try {
                await AsyncStorage.setItem('@user-id', JSON.stringify(data.user.cred.idp));
                log("Se ha actualizado el valor del id de usuario.");
            } catch (e) {
                log("No se ha podido actualizar el valor del id de usuario.");
            }
        },
        logged: false,
        friends: [],
        cred: {
            idp: null,
            updateIdp: async () => {
                try {
                    await AsyncStorage.setItem('@user-cred-idp', JSON.stringify(data.user.cred.idp));
                    log("Se ha actualizado el valor del idp.");
                } catch (e) {
                    log("No se ha podido actualizar el valor del idp.");
                }
            },
            username: null,
            updateUsername: async () => {
                try {
                    await AsyncStorage.setItem('@user-cred-username', JSON.stringify(data.user.cred.username));
                    log("Se ha actualizado el valor del username.");
                } catch (e) {
                    log("No se ha podido actualizar el valor del username.");
                }
            },
            password: null,
            updatePassword: async () => {
                try {
                    await AsyncStorage.setItem('@user-cred-password', JSON.stringify(data.user.cred.password));
                    log("Se ha actualizado el valor de la contraseña.");
                } catch (e) {
                    log("No se ha podido actualizar el valor de la contraseña.");
                }
            }
        },
        logIn: async (idp, user, password) => {
            log("Iniciando sesión...");
            var result = await fetchLogIn(idp, user, password);
            if (result.res) {
                log("result" + result);
                for (var x in result) {
                    log("x: " + x);
                }
                log("result.res: " + result.res);
                data.user.logged = true;
                data.user.cred.idp = idp;
                data.user.cred.username = user;
                data.user.cred.password = password;
                data.user.id = result.id;
                data.user.friends = result.friends;
                data.user.updateId();
                data.user.cred.updateIdp();
                data.user.cred.updateUsername();
                data.user.cred.updatePassword();
                log('ID de usuario: ' + data.user.id);
                log('amigos: ' + data.user.friends);
                return true;
            }
            return false;
        },
        logOut: async (callback) => {
            await data.reset();
            callback();
        },
        notifications: {
            list: [],
            addNotification: async (number, friends, msg) => {
                if (number > 0) {
                    let d = new Date();
                    let obj = {
                        id: uuid.v4(),
                        mensaje: msg,
                        number: number,
                        friends: friends,
                        date: d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear()
                    };
                    data.user.notifications.list.push(obj);
                    data.user.notifications.updateNotifications();
                    if (AppState.currentState != "active" && data.settings.notifications) {
                        var mensaje = "";
                        if (number == 1)
                            mensaje = "Tienes un amigo cerca de tu posición."
                        else
                            mensaje = "Tienes " + number + " amigos cerca de tu posición."
                        PushNotification.localNotification({
                            title: "Radarin",
                            message: mensaje
                        });
                    }
                }
            },
            deleteNotification: async (id) => {
                data.user.notifications.list = data.user.notifications.list.filter(function (obj) {
                    return obj.id !== id;
                });
                data.user.notifications.updateNotifications();
            },
            updateNotifications: async () => {
                try {
                    await AsyncStorage.setItem('@user-notifications', JSON.stringify(data.user.notifications.list));
                    log("Se ha actualizado el valor de la lista de notificaciones correctamente.");
                } catch (e) {
                    log("No se ha podido actualizar el valor de la lista de notificaciones.");
                }
            }
        }
    },
    init: async (callback) => {
        try {
            let id = await AsyncStorage.getItem('@user-id');
            if (id != null) {
                let idp = await AsyncStorage.getItem('@user-cred-idp');
                let user = await AsyncStorage.getItem('@user-cred-username');
                let pass = await AsyncStorage.getItem('@user-cred-password');
                if (idp != null && user != null && pass != null) {
                    idp = JSON.parse(idp);
                    user = JSON.parse(user);
                    pass = JSON.parse(pass);
                    let result = await fetchLogIn(idp, user, pass);
                    if (result.res) {
                        log("Las credenciales guardadas son correctas.");
                        data.user.friends = result.friends;
                        data.user.logged = true;
                        data.user.cred.idp = idp;
                        data.user.cred.username = user;
                        data.user.cred.password = pass;
                        data.user.id = result.id;
                        data.user.updateId();
                        let jsonValue;
                        jsonValue = await AsyncStorage.getItem('@user-notifications');
                        if (jsonValue != null)
                            data.user.notifications.list = JSON.parse(jsonValue);
                        jsonValue = await AsyncStorage.getItem('@settings-geolocation');
                        if (jsonValue != null)
                            data.settings.geolocation = JSON.parse(jsonValue);
                        jsonValue = await AsyncStorage.getItem('@settings-notifications');
                        if (jsonValue != null)
                            data.settings.notifications = JSON.parse(jsonValue);
                        log("Datos de usuario inicializados correctamente.");
                        if (data.settings.geolocation)
                            startBackgroundFunction();
                    } else {
                        log("Las credenciales guardadas ya no son correctas.");
                    }
                }
            } else {
                log("No hay id guardada por lo que no se inicializan datos.");
            }
            callback();
        } catch (e) {
            log(e);
            log("No se ha podido inicializar los datos de usuario.");
        }
    },
    reset: async () => {
        data.user.id = null;
        data.user.updateId();
        data.user.logged = false;
        data.user.cred.idp = null;
        data.user.cred.updateIdp();
        data.user.cred.username = null;
        data.user.cred.updateUsername();
        data.user.cred.password = null;
        data.user.cred.updatePassword();
        data.settings.geolocation = false;
        data.settings.updateGeolocation();
        data.settings.notifications = true;
        data.settings.updateNotifications();
        data.user.notifications.list = [];
        data.user.notifications.updateNotifications();
    }
}

async function fetchLogIn(idp, user, password) {
    var uri = "http://" + data.server.ip + ":" + data.server.port + "/api/user/login";
    var result = await fetch(uri, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }, body: JSON.stringify({
            idp: idp,
            user: user,
            password: password
        })
    })
        .then((response) => response.json())
        .then((json) => {
            log('Resultado de iniciar sesion: ' + json.result);
            if (json.result) {
                return {
                    res: true,
                    id: json.userid,
                    friends: json.friends
                };
            }
            return {
                res: false
            };
        })
        .catch((error) => {
            log('No se ha podido iniciar sesión.');
            log(error);
            return {
                res: false
            };
        });
    return result;
}