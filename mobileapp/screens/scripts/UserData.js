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
        geolocationTimeInterval: 10,
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
        ip: 'radarines6arestapiheroku.herokuapp.com'
    },
    user: {
        id: null,
        name: null,
        photo: null,
        updateId: async () => {
            try {
                await AsyncStorage.setItem('@user-id', JSON.stringify(data.user.cred.idp));
                log("Se ha actualizado el valor del id de usuario.");
            } catch (e) {
                log("No se ha podido actualizar el valor del id de usuario.");
            }
        },
        logged: false,
        reloadFriends: async () => {
            var result = await fetchLogIn(data.user.cred.idp, data.user.cred.username, data.user.cred.password);
            if (result.res) {
                data.user.addFriends(result.friends);
                if (data.user.notifications.list.length > 0) {
                    let list = data.user.notifications.list[0];
                    for (var i = 0; i < list.friends.length; i++) {
                        for (var j = 0; j < data.user.friends.length; j++) {
                            if (data.user.friends[j].idp == list.friends[i].idp && data.user.friends[j].username == list.friends[i].username) {
                                data.user.friends[j].near = true;
                                break;
                            }
                        }
                    }
                    data.user.friends.sort(function (a, b) {
                        if (a.near && b.near)
                            return 0;
                        else if (a.near)
                            return -1;
                        else
                            return 1;
                    });
                }
            }
        },
        friends: [],
        lastCheck: null,
        addFriends: async (friends) => {
            let list = [];
            let solid = 'https://solidcommunity.net';
            let inrupt = 'https://inrupt.net';
            for (var i = 0; i < friends.length; i++) {
                if (friends[i].includes("solidcommunity.net")) {
                    list.push({
                        webID: friends[i].replace('.net/', '.net'),
                        username: friends[i].replace('https://', '').replace('.solidcommunity.net/', '').replace('.solidcommunity.net', ''),
                        idp: solid,
                        near: false
                    });
                } else if (friends[i].includes("inrupt.net")) {
                    list.push({
                        webID: friends[i].replace('.net/', '.net'),
                        username: friends[i].replace('https://', '').replace('.inrupt.net/', '').replace('.inrupt.net', ''),
                        idp: inrupt
                    });
                }
            }
            data.user.friends = list;
        },
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
                data.user.logged = true;
                data.user.cred.idp = idp;
                data.user.cred.username = user;
                data.user.cred.password = password;
                data.user.id = result.id;
                data.user.name = result.name;
                data.user.photo = result.photo;
                data.user.addFriends(result.friends);
                data.user.updateId();
                data.user.cred.updateIdp();
                data.user.cred.updateUsername();
                data.user.cred.updatePassword();
                log('ID de usuario: ' + data.user.id);
                log('Amigos: ' + data.user.friends);
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
            addNotification: async (number, friends, msg, callback1, callback2) => {
                if (number > 0) {
                    let d = new Date();
                    let date = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear() + " " + d.getHours() + ":";
                    let min = d.getMinutes() + "";
                    if (min.length == 1)
                        min = "0" + min;
                    date = date + min;
                    data.user.lastCheck = date;
                    let obj = {
                        id: uuid.v4(),
                        mensaje: msg,
                        number: number,
                        friends: friends,
                        date: date
                    };
                    data.user.notifications.list.unshift(obj);
                    for (var k = 0; k < data.user.friends.length; k++) {
                        data.user.friends[k].near = false;
                    }
                    for (var i = 0; i < friends.length; i++) {
                        for (var j = 0; j < data.user.friends.length; j++) {
                            if (data.user.friends[j].idp == friends[i].idp && data.user.friends[j].username == friends[i].username) {
                                data.user.friends[j].near = true;
                                break;
                            }
                        }
                    }
                    data.user.friends.sort(function (a, b) {
                        if (a.near && b.near)
                            return 0;
                        else if (a.near)
                            return -1;
                        else
                            return 1;
                    });
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
                    await callback1();
                    await callback2();
                }
            },
            deleteNotification: async (id) => {
                data.user.notifications.list = data.user.notifications.list.filter(function (obj) {
                    return obj.id !== id;
                });
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
                        data.user.addFriends(result.friends);
                        data.user.name = result.name;
                        data.user.photo = result.photo;
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
        data.user.name = null;
        data.user.photo = null;
        data.user.lastCheck = null;
        data.user.friends = [];
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
    }
}

async function fetchLogIn(idp, user, password) {
    var uri = "https://" + data.server.ip + "/api/user/login";
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
                    friends: json.friends,
                    name: json.name,
                    photo: json.photo
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