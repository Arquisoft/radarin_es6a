/**
 * Log personalizado con hora del mensaje.
 * @param {string} message 
 */
export function log(message) {
    console.log(time() + message);
}

/**
 * Log de error personalizado con hora del mensaje.
 * @param {string} message 
 */
export function error(message) {
    console.error(time() + message);
}

/**
 * Genera y devuelve una cadena que precederá a los logs
 * @returns texto con la hora
 */
function time() {
    var date = new Date();
    var str = "[";
    str += format(date.getHours()) + ":" + format(date.getMinutes())
    str += ":" + format(date.getSeconds());
    str += "]-";
    return str;
}

/**
 * Recibe un numero y lo formatea a texto con dos digitos.
 * @param {number} str 
 * @returns cadena formateada
 */
function format(str) {
    str = "" + str;
    if (str.length == 1)
        return "0" + str;
    return str;
}