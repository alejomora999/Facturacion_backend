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
        res.json("Bienvendio Usuario");
    } else {
        res.json("Usuario o Clave no correcta");
    } 
})



module.exports = router;