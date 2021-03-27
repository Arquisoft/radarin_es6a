import BackgroundTimer from 'react-native-background-timer';
import { location } from './Location';
import { log } from './Log';

//Configuración por defecto
const func = location;
var sec = 10;
//Datos de la tarea
var running = false;

/**
 * Función que inicia la tarea en segundo plano.
 * Si ya hay otra tarea se detiene la que se estaba ejecutando.
 */
export function startBackgroundFunction() {
    BackgroundTimer.stopBackgroundTimer();
    BackgroundTimer.runBackgroundTimer(func, sec * 1000);
    running = true;
    log("Se ha iniciado la tarea en segundo plano.");
}

/**
 * Función que detiene la tarea en segundo plano.
 */
export function stopBackgroundFunction() {
    BackgroundTimer.stopBackgroundTimer();
    running = false;
    log("Se ha detenido la tarea en segundo plano.");
}

/**
 * Función que devuelve el estado de la tarea.
 * @returns true si hay tarea o false si no hay tarea.
 */
export function getBackgroundState() {
    return running;
}

/**
 * Función que modifica el intervalo de la tarea en segundo plano.
 * @param {number} seconds 
 */
export function setBackgroundInterval(seconds) {
    sec = seconds;
    log("El tiempo actual para la tarea en segundo plano es de " + sec + " segundos.");
}