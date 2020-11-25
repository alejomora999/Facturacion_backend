const { Router } = require('express');
const router = Router();
const BD = require('../config/configbd');

//READ products
router.get('/getProducts', async (req, res) => { //get y post => nombre apellido js sincrono
    sql = "select * from producto where state=1";
    //nombre,descripcion,precio_unidad,id_categoria
    let result = await BD.Open(sql, [], false);
    products = [];

    result.rows.map(producto => {//recorre cada objeto del arreglo
        let productsSchema = {
            "id_producto": producto[0],
            "nombre": producto[1],
            "descripcion": producto[2],
            "precio_unidad": producto[3],
            "id_categoria": producto[4]
        }

        products.push(productsSchema);
    })

    res.json(products);
})
//traer todas las cateogrtias
router.get('/getCategorias', async (req, res) => { //get y post => nombre apellido js sincrono
    const products=await getObtener();
    res.json(products);
})

//CREATE categoria

router.post('/addProduct', async (req, res) => { //post cifrar
    const { nombre, descripcion, precio_unidad,id_categoria,codigo } = req.body;
    //nombre,descripcion,precio_unidad,id_categoria
    sql = "insert into producto(nombre,descripcion,precio_unidad,id_categoria,codigo) values (:nombre,:descripcion,:precio_unidad,:id_categoria,:codigo)";

    await BD.Open(sql, [nombre, descripcion, precio_unidad,id_categoria,codigo], true);

    /*res.status(200).json({
        "nombre": nombre,
        "descripcion": descripcion,
        "precio_unidad": precio_unidad,
        "id_categoria": id_categoria
    })*/
    sql2 = "select * from producto where state=1";
    //nombre,descripcion,precio_unidad,id_categoria
    let result = await BD.Open(sql2, [], false);
    products = [];

    result.rows.map(producto => {//recorre cada objeto del arreglo
        let productsSchema = {
            "id_producto": producto[0],
            "nombre": producto[1],
            "descripcion": producto[2],
            "precio_unidad": producto[3],
            "id_categoria": producto[4],
            "codigo": producto[6]
        }

        products.push(productsSchema);
    })

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
    

    

    /*res.status(200).json({
        "nombre": nombre,
        "descripcion": descripcion,
        "precio_unidad": precio_unidad,
        "id_categoria": id_categoria
    })*/
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
            "iva": producto[3],
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


//DELETE
router.delete("/deleteProduct/:id_producto", async (req, res) => {
    const { id_producto } = req.params;

    sql = "update producto set state=0 where id=:id_producto";

    await BD.Open(sql, [id_producto], true);

    res.json({ "msg": "Producto Deshabilitado" })
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