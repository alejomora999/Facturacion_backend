// Este archivo para poder utilizar variables o funciones comunes en todos los endpoints

/*
* La función imprime el error en consola y devuelve automáticamente un json como respuesta en el endpoint 
* errorMsg: Es el valor del error para retornar  en el json
*/
const errorReturn = (endpoint, errorMsg) => {
    console.error(`Error en ${endpoint} -> ${errorMsg}`);
    return { error: true }
}

module.exports = {
    errorReturn: errorReturn,
}
