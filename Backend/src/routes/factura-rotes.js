const { Router } = require('express');
const router = Router();
const BD = require('../config/configbd');
//READ products
router.get('/getFactura', async (req, res) => { //get y post => nombre apellido js sincrono
    //sql = "select nombres||' '||apellidos from persona WHERE STATE=1";
    sql = "select distinct factura.id_factura,factura.vendedor,persona.nombres||' '||persona.apellidos as CLIENTE,REPLACE(REPLACE(factura.state,1,'HABILITADA'),0,'ANULADA') AS ESTADO,factura.fecha_compra as FECHA_REGISTRO,factura.fecha_compra as FECHA_COMPRA,(select  '$'||sum((((categoria.iva/100)+1)*(producto.precio_unidad*producto_pedido_cliente.cantidad_producto))) from cliente, persona,pedido_cliente, pago, producto_pedido_cliente, producto, categoria, factura where cliente.id_persona=persona.id_persona and pedido_cliente.id_cliente=cliente.id_cliente and pedido_cliente.id_pedido=factura.id_pedido and pedido_cliente.id_pedido=pago.id_pedido and pedido_cliente.id_pedido=producto_pedido_cliente.id_pedido and producto_pedido_cliente.id_producto=producto.id and producto.id_categoria=categoria.id_categoria) as TOTAL_SUMA_TOTAL   from cliente, persona,pedido_cliente, pago, producto_pedido_cliente, producto, categoria, factura where cliente.id_persona=persona.id_persona and pedido_cliente.id_cliente=cliente.id_cliente and pedido_cliente.id_pedido=factura.id_pedido and pedido_cliente.id_pedido=pago.id_pedido and pedido_cliente.id_pedido=producto_pedido_cliente.id_pedido and producto_pedido_cliente.id_producto=producto.id and producto.id_categoria=categoria.id_categoria";

    //nombre,descripcion,precio_unidad,id_categoria
    let result = await BD.Open(sql, [], false);
   
    facturas = [];

    result.rows.map(factura => {//recorre cada objeto del arreglo
        
        let productsSchema = {
            "Código": factura[0],
            "Vendedor": factura[1],
            "Cliente": factura[2],
            "Estado": factura[3],
            "Fecha_Registro": factura[4],
            "Fecha_Compra": factura[5],
            "Valor_Total":factura[6]
        }   
        facturas.push(productsSchema);
    })
    res.json(facturas);
})
router.get('/getFacturaHabilitada', async (req, res) => { //get y post => nombre apellido js sincrono
    //sql = "select nombres||' '||apellidos from persona WHERE STATE=1";
    sql = "select distinct producto.codigo,factura.vendedor,persona.nombres||' '||persona.apellidos as CLIENTE,REPLACE(factura.state,1,'HABILITADA') AS ESTADO,factura.fecha_compra as FECHA_REGISTRO,factura.fecha_compra as FECHA_COMPRA,(select  '$'||sum((((categoria.iva/100)+1)*(producto.precio_unidad*producto_pedido_cliente.cantidad_producto))) from cliente, persona,pedido_cliente, pago, producto_pedido_cliente, producto, categoria, factura where cliente.id_persona=persona.id_persona and pedido_cliente.id_cliente=cliente.id_cliente and pedido_cliente.id_pedido=factura.id_pedido and pedido_cliente.id_pedido=pago.id_pedido and pedido_cliente.id_pedido=producto_pedido_cliente.id_pedido and producto_pedido_cliente.id_producto=producto.id and producto.id_categoria=categoria.id_categoria) as TOTAL_SUMA_TOTAL   from cliente, persona,pedido_cliente, pago, producto_pedido_cliente, producto, categoria, factura where cliente.id_persona=persona.id_persona and pedido_cliente.id_cliente=cliente.id_cliente and pedido_cliente.id_pedido=factura.id_pedido and pedido_cliente.id_pedido=pago.id_pedido and pedido_cliente.id_pedido=producto_pedido_cliente.id_pedido and producto_pedido_cliente.id_producto=producto.id and producto.id_categoria=categoria.id_categoria and factura.state=1";

    //nombre,descripcion,precio_unidad,id_categoria
    let result = await BD.Open(sql, [], false);
   
    facturas = [];

    result.rows.map(factura => {//recorre cada objeto del arreglo
        
        let productsSchema = {
            "Código": factura[0],
            "Vendedor": factura[1],
            "Cliente": factura[2],
            "Estado": factura[3],
            "Fecha_Registro": factura[4],
            "Fecha_Compra": factura[5],
            "Valor_Total":factura[6]
        }   
        facturas.push(productsSchema);
    })
    res.json(facturas);
})
router.get('/getFacturaAnulada', async (req, res) => { //get y post => nombre apellido js sincrono
    //sql = "select nombres||' '||apellidos from persona WHERE STATE=1";
    sql = "select distinct producto.codigo,factura.vendedor,persona.nombres||' '||persona.apellidos as CLIENTE,REPLACE(factura.state,0,'ANULADA') AS ESTADO,factura.fecha_compra as FECHA_REGISTRO,factura.fecha_compra as FECHA_COMPRA,(select  '$'||sum((((categoria.iva/100)+1)*(producto.precio_unidad*producto_pedido_cliente.cantidad_producto))) from cliente, persona,pedido_cliente, pago, producto_pedido_cliente, producto, categoria, factura where cliente.id_persona=persona.id_persona and pedido_cliente.id_cliente=cliente.id_cliente and pedido_cliente.id_pedido=factura.id_pedido and pedido_cliente.id_pedido=pago.id_pedido and pedido_cliente.id_pedido=producto_pedido_cliente.id_pedido and producto_pedido_cliente.id_producto=producto.id and producto.id_categoria=categoria.id_categoria) as TOTAL_SUMA_TOTAL   from cliente, persona,pedido_cliente, pago, producto_pedido_cliente, producto, categoria, factura where cliente.id_persona=persona.id_persona and pedido_cliente.id_cliente=cliente.id_cliente and pedido_cliente.id_pedido=factura.id_pedido and pedido_cliente.id_pedido=pago.id_pedido and pedido_cliente.id_pedido=producto_pedido_cliente.id_pedido and producto_pedido_cliente.id_producto=producto.id and producto.id_categoria=categoria.id_categoria and factura.state=0";

    //nombre,descripcion,precio_unidad,id_categoria
    let result = await BD.Open(sql, [], false);
   
    facturas = [];

    result.rows.map(factura => {//recorre cada objeto del arreglo
        
        let productsSchema = {
            "Código": factura[0],
            "Vendedor": factura[1],
            "Cliente": factura[2],
            "Estado": factura[3],
            "Fecha_Registro": factura[4],
            "Fecha_Compra": factura[5],
            "Valor_Total":factura[6]
        }   
        facturas.push(productsSchema);
    })
    res.json(facturas);
    
})


module.exports = router;