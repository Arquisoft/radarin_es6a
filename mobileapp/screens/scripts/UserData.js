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
    notifications: [],
    geo: false,
    not: true,
    server: {
        ip: '10.0.2.2',
        port: "5000"
    },
    user: {
        id: '605f53998a7ec5322c089257'
    },
    updateNotifications: async () => {
        try {
            await AsyncStorage.setItem('@notifications', JSON.stringify(data.notifications));
            log("Se ha actualizado el valor de la lista de notificaciones correctamente.");
        } catch (e) {
            log("No se ha podido actualizar el valor de la lista de notificaciones.");
        }
    },
    updateGeo: async () => {
        try {
            await AsyncStorage.setItem('@geo', JSON.stringify(data.geo));
            log("Se ha actualizado el valor del ajuste de geolocalización.");
        } catch (e) {
            log("No se ha podido actualizar el valor del ajuste de geolocalización.");
        }
    },
    updateNot: async () => {
        try {
            await AsyncStorage.setItem('@not', JSON.stringify(data.not));
            log("Se ha actualizado el valor del ajuste de notificación.");
        } catch (e) {
            log("No se ha podido actualizar el valor del ajuste de notificación.");
        }
    },
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
            data.notifications.push(obj);
            data.updateNotifications();
            if (AppState.currentState != "active" && data.not) {
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
        data.notifications = data.notifications.filter(function (obj) {
            return obj.id !== id;
        });
        data.updateNotifications();
    },
    init: async () => {
        try {
            let jsonValue;
            jsonValue = await AsyncStorage.getItem('@notifications')
            if (jsonValue != null)
                data.notifications = JSON.parse(jsonValue);
            jsonValue = await AsyncStorage.getItem('@geo')
            if (jsonValue != null)
                data.geo = JSON.parse(jsonValue);
            jsonValue = await AsyncStorage.getItem('@not')
            if (jsonValue != null)
                data.not = JSON.parse(jsonValue);
            log("Datos de usuario inicializados correctamente.");
            if (data.geo)
                startBackgroundFunction();
        } catch (e) {
            log("No se ha podido inicializar los datos de usuario.");
        }
    }
}