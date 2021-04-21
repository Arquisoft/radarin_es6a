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
        id: '605f53998a7ec5322c089257',
        logged: false,
        logIn: async (user, password) => {
            var uri = "http://" + data.server.ip + ":" + data.server.port + "/api/user/login";
            log("Iniciando sesión...");
            var result = await fetch(uri, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }, body: JSON.stringify({
                    user: user,
                    password: password
                })
            })
                .then((response) => response.json())
                .then((json) => {
                    log('Resultado de iniciar sesion: ' + json.result);
                    return false;
                })
                .catch((error) => {
                    log('No se ha podido iniciar sesión.');
                    log(error);
                    return false;
                });
            return result;
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
    init: async () => {
        try {
            let jsonValue;
            jsonValue = await AsyncStorage.getItem('@user-notifications')
            if (jsonValue != null)
                data.user.notifications.list = JSON.parse(jsonValue);
            jsonValue = await AsyncStorage.getItem('@settings-geolocation')
            if (jsonValue != null)
                data.settings.geolocation = JSON.parse(jsonValue);
            jsonValue = await AsyncStorage.getItem('@settings-notifications')
            if (jsonValue != null)
                data.settings.notifications = JSON.parse(jsonValue);
            log("Datos de usuario inicializados correctamente.");
            if (data.settings.geolocation)
                startBackgroundFunction();
        } catch (e) {
            log("No se ha podido inicializar los datos de usuario.");
        }
    }
}