import GetLocation from 'react-native-get-location';
import { log } from './Log';
import { addNotification } from './UserData';

const uri = "http://10.0.2.2:5000/api/locations/addbyid"

/**
 * Funcion para manejar la localización
 * @param {GetLocation.Location} location 
 */
function handleLocation(location) {
    log("Coordenadas:" + location.longitude + "," + location.latitude);
    fetch(uri, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }, body: JSON.stringify({
            longitud: location.longitude,
            latitud: location.latitude,
            id: '605f53998a7ec5322c089257'
        })
    })
        .then((response) => response.json())
        .then((json) => {
            log('Coordenadas enviadas correctamente.');
            log('Hay ' + json.number + ' amigos cerca.');
            addNotification(json.number, json.friends);
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