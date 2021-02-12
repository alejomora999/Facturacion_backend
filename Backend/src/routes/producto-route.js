const oracledb = require('oracledb');
const { Router } = require('express');
const router = Router();
const BD = require('../config/configbd');
const { errorReturn } = require('./utils');

// State es el valor para buscar productos activos o inactivos. Por defecto es 1 para buscar los productos activos
const getAllProductosInventario = async () => {
    const sql = `SELECT p.id, p.nombre , p.descripcion, p.precio_unidad, p.id_categoria, 
        p.codigo, i.cantidad_disponible, c.iva, i.state  
        FROM INVENTARIO i INNER JOIN PRODUCTO p ON i.ID_PRODUCTO = p.ID
        INNER JOIN categoria c ON p.ID_CATEGORIA = c.ID_CATEGORIA
        ORDER BY p.id DESC`;

    const results = await BD.Open(sql, [], false);
    
    const productos = results.rows.map(producto => {//recorre cada objeto del arreglo
        return {
            "id_producto": producto[0],
            "nombre": producto[1],
            "descripcion": producto[2],
            "precio_unidad": producto[3],
            "id_categoria": producto[4],
            "codigo": producto[5],
            "existencias": producto[6],
            "estado": producto[8],
            "iva": producto[7]/100
        }
    });

    return productos;
}

const GETPRODUCTS = '/getProducts';
const CREATEPRODUCT = '/addProduct';

//READ products
router.get(GETPRODUCTS, async (req, res) => { //get y post => nombre apellido js sincrono
    let response;
    try {
        response = await getAllProductosInventario();
    } catch (error) {
        response = errorReturn(GETPRODUCTS, error);
    }
    res.json(response);
})

//CREATE producto
router.post(CREATEPRODUCT, async (req, res) => { //post cifrar
    const { nombre, descripcion, precio_unidad,id_categoria, codigo } = req.body;
    const sqlInsertProducto = `INSERT INTO producto(nombre,descripcion,precio_unidad,id_categoria,codigo)
        VALUES (:nombre,:descripcion,:precio_unidad,:id_categoria,:codigo) returning id
        INTO :productoId`;
    const sqlInsertInventario = "INSERT INTO inventario(cantidad_disponible, id_producto, state, descripcion) "
        +"VALUES (0, :productoId, 1, 'Producto recién creado')";
    let response;

    try {
        const binds = { 
            nombre: nombre,
            descripcion: descripcion,
            precio_unidad: precio_unidad,
            id_categoria: id_categoria,
            codigo: codigo,
            productoId: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT } 
        }
        const insertedProduct = await BD.Open(sqlInsertProducto, binds, true);
        
        const productoId = insertedProduct.outBinds.productoId[0];
        await BD.Open(sqlInsertInventario, [productoId], true);
        response = await getAllProductosInventario();
    } catch(error) {
        response = errorReturn(CREATEPRODUCT, error);
    }
    res.json(response);
});

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

});

const actualizarEstado = async (state = 1, id_producto) => {
    const sql = `UPDATE inventario SET state=:state WHERE id_producto=:id_producto`;
    const r = await BD.Open(sql, [state,id_producto], true);
    console.log('yei', r);
    return {
        "message": 'ok',
    };
};

//UPDATE
router.put("/deshabilitarProducto", async (req, res) => {
    const { id_producto  } = req.body;
    const response = await actualizarEstado(0, id_producto);
    res.status(200).json(response);
});

//UPDATE
router.put("/habilitarProducto", async (req, res) => {
    const { id_producto  } = req.body;
    const response = await actualizarEstado(1,id_producto);
    res.status(200).json(response);
});

module.exports = router;