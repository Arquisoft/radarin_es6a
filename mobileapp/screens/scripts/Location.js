import GetLocation from 'react-native-get-location';
import { log, error } from './Log';

const uri = "http://10.0.2.2:5000/api/locations/add"

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
            fecha: new Date().getDate(),
            email: 'admin'
        })
    })
        .then(response => log('Coordenadas enviadas correctamente.'))
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