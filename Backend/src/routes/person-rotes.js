const { Router } = require('express');
const router = Router();
const BD = require('../config/configbd');

const { exec } = require("child_process");


//traer todas las cateogrtias
router.get('/getCategorias', async (req, res) => { //get y post => nombre apellido js sincrono
    const products=await getObtener();
    res.json(products);
   
})

//INSERT CATEGORIA
//CREATE

router.post('/addCategoria', async (req, res) => { //post cifrar
    const { nombre, descripcion, iva } = req.body;
    //nombre,descripcion,precio_unidad,id_categoria
    sql = "insert into categoria(nombre,descripcion,iva) values (:nombre,:descripcion,:iva)";
    await BD.Open(sql, [nombre, descripcion, iva], true);
    const products=await getObtener();
    res.json(products);
})


const getObtener= async()=>{
   // sql2 = "select categoria.nombre from categoria,producto where producto.id_categoria=categoria.id_categoria and producto.state=1";
    //nombre,descripcion,precio_unidad,id_categoria
    sql2 = "select * from categoria";
    let result = await BD.Open(sql2, [], false);
    products = [];

    result.rows.map(producto => {//recorre cada objeto del arreglo
        let productsSchema = {
            "id_categoria": producto[0],
            "nombre": producto[1],
            "descripcion": producto[2],
            "iva": producto[3]
            //"precio_unidad": producto[3],
            //"id_categoria": producto[4]
        }

        products.push(productsSchema);
    })
    console.log(products);
    return products;
}


//UPDATE
router.put("/updateProduct", async (req, res) => {
    const { id_producto,nombre, descripcion, precio_unidad, id_categoria } = req.body;

    sql = "update producto set nombre=:nombre, descripcion=:descripcion, precio_unidad=:precio_unidad, id_categoria=:id_categoria where id=:id_producto";

    await BD.Open(sql, [nombre, descripcion, precio_unidad,id_categoria,id_producto], true);

    res.status(200).json({
        
        "id_producto": id_producto,
        "nombre": nombre,
        "descripcion": descripcion,
        "precio_unidad": precio_unidad,
        "id_categoria": id_categoria
    })

})
router.put("/addExistenciasProducto", async (req, res) => {
    const { codigo,cantidad, descripcion } = req.body;

    //sql = "update inventario set descripcion='Tres pc',  cantidad_disponible = (select (inventario.cantidad_disponible) + 2 from producto, inventario where inventario.id_producto=producto.id and producto.codigo='40C') where inventario.id_producto=(select producto.id from producto, inventario where inventario.id_producto=producto.id and producto.codigo='40C')";
    sql ="select id from producto where codigo=:codigo";
    
    let id_producto=await BD.Open(sql, [codigo], false);
    logins = [];
    id_producto.rows.map(login => {//recorre cada objeto del arreglo
        
        let productsSchema = login[0];   
        logins.push(productsSchema);
    })
    console.log(logins);
    sql2 =`select inventario.cantidad_disponible  from producto, inventario where inventario.id_producto=${logins} and producto.codigo=:codigo`;
    let cantidad_producto=await BD.Open(sql2, [codigo], false);
    logins2 = [];
    cantidad_producto.rows.map(login2 => {//recorre cada objeto del arreglo
        
        let productsSchema = login2[0];   
        logins2.push(productsSchema);
    })
    let numA =  parseInt(logins2);
    let numB=parseInt(logins);
    let numC =parseInt(cantidad);
    let numD = numA+numC;
    let des =descripcion;
    sql3 =`update inventario set cantidad_disponible=${numD},descripcion='${des}' where id_producto=${numB}`;
    console.log(sql3);
    sql5=sql3;

    try {
        ///fdfdffddf
        await BD.Open(sql5, [], true);
      } catch (error) {
        console.error(error);
        // expected output: ReferenceError: nonExistentFunction is not defined
        // Note - error messages will vary depending on browser
      }
    
   // await BD.Open(sql, [codigo, cantidad,descripcion], true);

    res.json({ "msg": "OK" })

})
////funcion nueva :V const getObtener= async()=>{
async function addExistencia(cantidad,descripcion, codigo) {
    sql ="update inventario set descripcion='Tres pc por proveedor',  cantidad_disponible = 63 where id_producto=2";
}


//DELETE
router.delete("/deleteProduct/:id_producto", async (req, res) => {
    const { id_producto } = req.params;

    sql = "update producto set state=0 where id=:id_producto";

    await BD.Open(sql, [id_producto], true);

    res.json({ "message": true });
})

router.get('/',async (req,res)=> {
    sql="select * from producto";
    let result1 = await BD.Open(sql, [], false);
    console.log(result1.rows);
    res.status(200).json({    
        msg:"todo correcto cambio de mensaje nuevo 4"
    })
})
module.exports = router;