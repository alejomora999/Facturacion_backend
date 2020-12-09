const { Router } = require('express');
const router = Router();
const BD = require('../config/configbd');
router.post('/revUsername', async (req, res) => { //post cifrar
    const { username, password } = req.body;
    //nombre,descripcion,precio_unidad,id_categoria
    sql = "select count(username) from operador where username=:codigo and password=:password";
    let result = await BD.Open(sql, [username,password], false);
    logins = [];
    result.rows.map(login => {//recorre cada objeto del arreglo
        
        let productsSchema = login[0];   
        logins.push(productsSchema);
    })
    if (logins==1) {
        res.json({message: "Bienvenido usuario", login: true});
    } else {
        res.json({message: 'Usuario o contraseña erroneos', login: false});
    } 
})
router.post('/getUserInfo', async (req, res) => { //Información para obtener operadores, por post
    const { username } = req.body;
    const nombre = username;
    console.log(nombre);
    sql =`select persona.nombres||' '||persona.apellidos, operador.rol, persona.numero_identificacion, persona.fecha_nacimiento from operador, persona where (operador.id_persona=persona.id_persona) and ((upper(persona.nombres) like upper('%${nombre}%')) or (upper(persona.apellidos) like upper('%${nombre}%')) or (upper(operador.username) like upper('%${nombre}%')))`;
    console.log(sql);
    try {
        ///buscando coincidencias
        let result = await BD.Open(sql, [], false);
        logins = [];
        result.rows.map(login => {//recorre cada objeto del arreglo
        
        let productsSchema = {
            "nombre_persona": login[0],   
            "tipo_de_usuario": login[1],
            "numero_identifiacion": login[2],
            "fecha_nacimiento": login[3]
        }
        console.log(productsSchema);
        logins.push(productsSchema);
        })
        
        if (Object.entries(logins).length === 0 ) {
            res.json({message: "NO hay coincidencias"});
        } else {
            res.json(logins);
        }
        
        
    } catch (error) {
        console.error(error);
        // expected output: ReferenceError: nonExistentFunction is not defined
        // Note - error messages will vary depending on browser
        res.json({message: "NO hay coincidencias"});
    }
})
//select persona.nombres||' '||persona.apellidos,REPLACE(cliente.state,1,'Cliente'),persona.numero_identificacion, persona.fecha_nacimiento from cliente, persona where (cliente.id_persona=persona.id_persona) and cliente.state=1
router.get('/getAllClientes', async (req, res) => { //Información para obtener clientes activos, por post
    //console.log(sql);
    sql = "select persona.nombres||' '||persona.apellidos,REPLACE(cliente.state,1,'Cliente'),persona.numero_identificacion, persona.fecha_nacimiento from cliente, persona where (cliente.id_persona=persona.id_persona) and cliente.state=1";
    try {
        ///buscando coincidencias
        let result = await BD.Open(sql, [], false);
        logins = [];
        result.rows.map(login => {//recorre cada objeto del arreglo
        
        let productsSchema = {
            "nombre_persona": login[0],   
            "rol": login[1],
            "numero_identifiacion": login[2],
            "fecha_nacimiento": login[3]
        }
        console.log(productsSchema);
        logins.push(productsSchema);
        })
        if (Object.entries(logins).length === 0 ) {
            res.json({message: "NO hay coincidencias"});
        } else {
            res.json(logins);
        }
        
        
    } catch (error) {
        console.error(error);
        // expected output: ReferenceError: nonExistentFunction is not defined
        // Note - error messages will vary depending on browser
        res.json({message: "NO hay coincidencias"});
    }
})

module.exports = router;

//id producto, cantidad de existencias, descripcion de entrada