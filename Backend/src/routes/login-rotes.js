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
//add operador
router.post('/insertOperador',async (req,res)=>{
    const { nombres,apellidos,numero_identificacion,telefono,fecha_nacimiento,rol,username,password } = req.body;
    try {
        sql = "select count(username) from operador where username=:codigo ";
        let result = await BD.Open(sql, [username], false);
        logins = [];
        result.rows.map(login => {//recorre cada objeto del arreglo
            let productsSchema = login[0];   
            logins.push(productsSchema);
        })
        if (logins==1) {
            res.json({message: "Usuario, con ese username Ya Existe"});
        } else {
            sql2 = "insert into persona (nombres,apellidos,numero_identificacion,telefono,fecha_nacimiento) values (:nombres,:apellidos,:numero_identificacion,:telefono,TO_DATE(:fecha_nacimiento))";
            await BD.Open(sql2, [nombres,apellidos,numero_identificacion,telefono,fecha_nacimiento], true);
            sql3="select id_persona from persona where rownum=1 order by id_persona desc";
            let result3 = await BD.Open(sql3, [], false);
            v_persona = [];
            result3.rows.map(vendedor_pedido => {//se obtiene el id de la persona recien ingresada
                let productsSchema2 =vendedor_pedido[0];
                v_persona.push(productsSchema2);
            })
            console.log(v_persona);
            let valor_persona =  parseInt(v_persona);
            sql4 = `INSERT INTO OPERADOR (ROL,ID_PERSONA,USERNAME,PASSWORD) VALUES (:rol,${valor_persona},:username,:password)`;
            sql5 =sql4;
            console.log(sql5);
            await BD.Open(sql5, [rol,username,password], true);
            res.json({message: "Usuario Creado"});
        }//cierre else 
        
      } catch (error) {
        console.error(error);
        // expected output: ReferenceError: nonExistentFunction is not defined
        // Note - error messages will vary depending on browser
        res.json({ "message": "Algo ha salido mal al crear un usuario" });
      }    
})
//creacion cliente
router.post('/insertCliente',async (req,res)=>{
    const { nombres,apellidos,numero_identificacion,telefono,fecha_nacimiento } = req.body;
    try {
            sql2 = "insert into persona (nombres,apellidos,numero_identificacion,telefono,fecha_nacimiento) values (:nombres,:apellidos,:numero_identificacion,:telefono,TO_DATE(:fecha_nacimiento))";
            await BD.Open(sql2, [nombres,apellidos,numero_identificacion,telefono,fecha_nacimiento], true);
            sql3="select id_persona from persona where rownum=1 order by id_persona desc";
            let result3 = await BD.Open(sql3, [], false);
            v_persona = [];
            result3.rows.map(vendedor_pedido => {//se obtiene el id de la persona recien ingresada
                let productsSchema2 =vendedor_pedido[0];
                v_persona.push(productsSchema2);
            })
            console.log(v_persona);
            let valor_persona =  parseInt(v_persona);
            sql4 = `INSERT INTO CLIENTE (fecha_registro,id_persona) values (to_date(sysdate),${valor_persona})`;
            sql5 =sql4;
            console.log(sql5);
            await BD.Open(sql5, [], true);
            res.json({message: "Cliente Creado"});
        
      } catch (error) {
        console.error(error);
        // expected output: ReferenceError: nonExistentFunction is not defined
        // Note - error messages will vary depending on browser
        res.json({ "message": "Algo ha salido mal al crear un cliente" });
      }    
})


module.exports = router;

//id producto, cantidad de existencias, descripcion de entrada