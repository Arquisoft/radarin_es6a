import GetLocation from 'react-native-get-location';
import { log, error } from './Log';

/**
 * Funcion para manejar la localización
 * @param {GetLocation.Location} location 
 */
function handleLocation(location) {
    log("Coordenadas:" + location.longitude + "," + location.latitude);
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