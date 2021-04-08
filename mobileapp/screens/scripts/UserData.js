import PushNotification from "react-native-push-notification";
import { AppState } from 'react-native'

export var data = {
    notifications: [],
    geo: false,
    not: true
}

export function addNotification(number, friends) {
    if (number > 0) {
        data.notifications.push({
            number: number,
            friends: friends,
            date: new Date()
        });
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
}