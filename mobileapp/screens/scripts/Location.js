import GetLocation from 'react-native-get-location';
import { log } from './Log';
import { data } from './UserData';

var reload1 = () => { };
export function LocationCallback1(func) {
    reload1 = func;
}

var reload2 = () => { };
export function LocationCallback2(func) {
    reload2 = func;
}

/**
 * Funcion para manejar la localización
 * @param {GetLocation.Location} location 
 */
function handleLocation(location) {
    var uri = "https://" + data.server.ip + "/api/locations/add";
    log("Coordenadas:" + location.longitude + "," + location.latitude);
    fetch(uri, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }, body: JSON.stringify({
            longitud: location.longitude,
            latitud: location.latitude,
            id: data.user.id,
            friends: data.user.friends
        })
    })
        .then((response) => response.json())
        .then((json) => {
            log('Coordenadas enviadas correctamente.');
            log('Hay ' + json.number + ' amigos cerca.');
            let msg = '';
            if (json.number == 1)
                msg = "Hay un amigo cerca"
            else
                msg = "Hay " + json.number + " amigos cerca"
            data.user.notifications.addNotification(json.number, json.friends, msg, reload1, reload2);
        })
        .catch((error) => log('Error en el envio: ' + error));
}

/**
 * Función que obtiene la localización y si la puede obtener llama al manejador.
 */
export function location() {
    GetLocation.getCurrentPosition(
        {
            enableHighAccuracy: true,
            timeout: 15000,
        }
    ).then(location => {
        handleLocation(location);
    }).catch(error => {
        const { code, message } = error;
        error(code + " " + message);
    });
};