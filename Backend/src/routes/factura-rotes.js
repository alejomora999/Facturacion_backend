const { Router } = require('express');
const router = Router();
const BD = require('../config/configbd');

const getFacturas = async (state='') => {
    sql = `SELECT DISTINCT factura.id_factura, factura.codigo, UPPER(aux_o.nombre_completo) as vendedor,
        UPPER(persona.nombres||' '||persona.apellidos) AS cliente,
        REPLACE(REPLACE(factura.state,1,'HABILITADA'), 0, 'ANULADA') AS estado, 
        to_char(factura.fecha_compra, 'dd-mm-YYYY') AS fecha_registro, 
        to_char(factura.fecha_compra, 'dd-mm-YYYY') AS fecha_compra, 
        (SELECT  sum((((categoria.iva/100)+1)*(producto.precio_unidad*producto_pedido_cliente.cantidad_producto))) 
            FROM cliente, persona, pedido_cliente, pago, producto_pedido_cliente, producto, categoria, factura 
            WHERE cliente.id_persona=persona.id_persona 
            AND pedido_cliente.id_cliente=cliente.id_cliente 
            AND pedido_cliente.id_pedido=factura.id_pedido 
            AND pedido_cliente.id_pedido=pago.id_pedido 
            AND pedido_cliente.id_pedido=producto_pedido_cliente.id_pedido 
            AND producto_pedido_cliente.id_producto=producto.id 
            AND producto.id_categoria=categoria.id_categoria
        ) AS TOTAL_SUMA_TOTAL 
        FROM cliente, persona,pedido_cliente, pago, producto_pedido_cliente, producto, categoria, factura, 
            (SELECT p.nombres||' '||p.apellidos AS nombre_completo, TO_CHAR(o.ID_OPERADOR) AS id_operador
                FROM operador o, persona p WHERE o.ID_PERSONA = p.ID_PERSONA 
            ) aux_o
        WHERE cliente.id_persona=persona.id_persona
        AND factura.vendedor = aux_o.id_operador
        AND pedido_cliente.id_cliente=cliente.id_cliente 
        AND pedido_cliente.id_pedido=factura.id_pedido 
        AND pedido_cliente.id_pedido=pago.id_pedido 
        AND pedido_cliente.id_pedido=producto_pedido_cliente.id_pedido 
        AND producto_pedido_cliente.id_producto=producto.id 
        AND producto.id_categoria=categoria.id_categoria
        `;
    if (state !== '') {
        sql += `AND factura.state=${state}`;
    }
    
    let result = await BD.Open(sql, [], false);
    let facturas = [];
    result.rows.map(factura => {
        // console.log(typeof factura[5])
        let productsSchema = {
            "id_factura": factura[0],
            "codigo": factura[1],
            "vendedor": factura[2],
            "cliente": factura[3],
            "estado": factura[4],
            "fecha_registro": factura[5],
            "fecha_compra": factura[6],
            "valor_total":factura[7]
        }
        facturas.push(productsSchema);
    });
    return facturas;
}

//READ products
router.get('/getFactura', async (req, res) => { //get y post => nombre apellido js sincrono
    const facturas = await getFacturas();
    res.json(facturas);
});

router.get('/getFacturaHabilitada', async (req, res) => { //get y post => nombre apellido js sincrono
    const facturas = await getFacturas('1');
    res.json(facturas);
});

router.get('/getFacturaAnulada', async (req, res) => { //get y post => nombre apellido js sincrono
    const facturas = await getFacturas('0');
    res.json(facturas);    
});

router.post('/getCabeceraFactura',async (req,res)=>{
    const { id_factura } = req.body;
    sql = "SELECT DISTINCT factura.id_factura,factura.vendedor,persona.nombres||' '||persona.apellidos AS cliente,REPLACE(REPLACE(factura.state,1,'HABILITADA'),0,'ANULADA') AS estado,factura.fecha_compra AS fecha_registro,factura.fecha_compra AS fecha_compra,(SELECT  '$'||sum((((categoria.iva/100))*(producto.precio_unidad*producto_pedido_cliente.cantidad_producto)))  from cliente, persona,pedido_cliente, pago, producto_pedido_cliente, producto, categoria, factura where cliente.id_persona=persona.id_persona AND pedido_cliente.id_cliente=cliente.id_cliente AND pedido_cliente.id_pedido=factura.id_pedido AND pedido_cliente.id_pedido=pago.id_pedido AND pedido_cliente.id_pedido=producto_pedido_cliente.id_pedido AND producto_pedido_cliente.id_producto=producto.id AND producto.id_categoria=categoria.id_categoria) AS TOTAL_IVA,(SELECT  '$'||sum((((categoria.iva/100)+1)*(producto.precio_unidad*producto_pedido_cliente.cantidad_producto)))  from cliente, persona,pedido_cliente, pago, producto_pedido_cliente, producto, categoria, factura where cliente.id_persona=persona.id_persona AND pedido_cliente.id_cliente=cliente.id_cliente AND pedido_cliente.id_pedido=factura.id_pedido AND pedido_cliente.id_pedido=pago.id_pedido AND pedido_cliente.id_pedido=producto_pedido_cliente.id_pedido AND producto_pedido_cliente.id_producto=producto.id AND producto.id_categoria=categoria.id_categoria) AS TOTAL_SUMA_TOTAL  from cliente, persona,pedido_cliente, pago, producto_pedido_cliente, producto, categoria, factura where cliente.id_persona=persona.id_persona AND pedido_cliente.id_cliente=cliente.id_cliente AND pedido_cliente.id_pedido=factura.id_pedido AND pedido_cliente.id_pedido=pago.id_pedido AND pedido_cliente.id_pedido=producto_pedido_cliente.id_pedido AND producto_pedido_cliente.id_producto=producto.id AND producto.id_categoria=categoria.id_categoria AND factura.id_factura=:id_factura";
    let result = await BD.Open(sql, [id_factura], false);
   
    facturas = [];

    result.rows.map(factura => {//recorre cada objeto del arreglo
        
        let productsSchema = {
            "codigo": factura[0],
            "vendedor": factura[1],
            "cliente": factura[2],
            "estado": factura[3],
            "fecha_registro": factura[4],
            "fecha_compra": factura[5],
            "valor_total_IVA":factura[6],
            "valor_total":factura[7]
        }   
        facturas.push(productsSchema);
    })
    res.json(facturas);

})

router.post('/getDetalleFactura',async (req,res)=>{
    const { id_factura } = req.body;
    sql = "  SELECT producto.nombre, '$'||producto.precio_unidad, producto_pedido_cliente.cantidad_producto,'$'||(producto.precio_unidad*producto_pedido_cliente.cantidad_producto) AS subtotal ,categoria.iva||'%' AS iva,'$'||(((categoria.iva/100)+1)*(producto.precio_unidad*producto_pedido_cliente.cantidad_producto)) AS TOTAL_PRODUCTO from cliente, persona,pedido_cliente, pago, producto_pedido_cliente, producto, categoria, factura where cliente.id_persona=persona.id_persona AND pedido_cliente.id_cliente=cliente.id_cliente AND pedido_cliente.id_pedido=factura.id_pedido AND pedido_cliente.id_pedido=pago.id_pedido AND pedido_cliente.id_pedido=producto_pedido_cliente.id_pedido AND producto_pedido_cliente.id_producto=producto.id AND producto.id_categoria=categoria.id_categoria AND factura.id_factura=:id_factura";
    let result = await BD.Open(sql, [id_factura], false);
   
    facturas = [];

    result.rows.map(factura => {//recorre cada objeto del arreglo
        
        let productsSchema = {
            "Nombre": factura[0],
            "Precio": factura[1],
            "Cantidad": factura[2],
            "Subtotal": factura[3],
            "IVA": factura[4],
            "valor_total_Producto":factura[5]
        }   
        facturas.push(productsSchema);
    })
    res.json(facturas);

})
router.delete("/disableFactura/:id_factura", async (req, res) => {
    const { id_factura } = req.params;

    sql = "update factura set state=0 where id_factura=:id_factura";

    await BD.Open(sql, [id_factura], true);

    res.json({ "message": true });
})
///isnsertar factura
router.post('/insertFactura',async (req,res)=>{
    const { id_cliente, id_vendedor,codigo, productos, fecha_registro,fecha_compra,tipo_pago } = req.body;
    
    try {
        sql = "INSERT INTO pedido_cliente (numero_productos,id_cliente) values (0,:id_cliente)";
        await BD.Open(sql, [id_cliente], true);
        sql2 = "select id_pedido from pedido_cliente where rownum=1 order by id_pedido desc";
        let result2 = await BD.Open(sql2, [], false);
        pedido = [];
        result2.rows.map(pedido_cliente => {//se obtiene el id de pedido cliente
            
            let productsSchema =pedido_cliente[0];
            pedido.push(productsSchema);
        })
        console.log(pedido);
        /*sql3=`select persona.nombres||' '||persona.apellidos from persona,operador 
        where  operador.id_persona=persona.id_persona and operador.id_persona=:id_vendedor`;
        let result3 = await BD.Open(sql3, [id_vendedor], false);
        vendedor = [];
        result3.rows.map(vendedor_pedido => {//se obtiene el nombre del vendedor
            
            let productsSchema2 =vendedor_pedido[0];
            vendedor.push(productsSchema2);
        })
        console.log(vendedor);*/
        let valor_pedido =  parseInt(pedido);
        //let valor_vendedor=parseInt(vendedor);
        
        //for para cargar los productos
        for (let i=0; i < productos.length; i++) {
            const producto = productos[i];
            console.log(producto['id_producto'], producto['cantidad']);
            sql4 = `insert into producto_pedido_cliente(id_producto,id_pedido,cantidad_producto) 
            values (${producto['id_producto']},${valor_pedido},${producto['cantidad']})`; //aca vamos ,bien
            sql10=sql4
            console.log(sql10);
            await BD.Open(sql10, [], true);
        } 
        sql5 = `insert into pago (tipo_pago,estado,id_pedido) values (:tipo_pago,'PAGADO',${valor_pedido})`;
        sql6=sql5;
        await BD.Open(sql6, [tipo_pago], true);//aca vamos bien
        let fechac= fecha_compra;
        sql7 = `insert into factura (fecha_compra,id_pedido,estado,vendedor,codigo) 
        values (TO_DATE('${fechac}','YYYY-MM-DD'),${valor_pedido},'HABILITADA',:id_vendedor,:codigo)`;
        sql8=sql7;
        console.log(sql8);
        await BD.Open(sql8, [id_vendedor,codigo], true);
        res.json({ "message": true });
        
      } catch (error) {
        console.error(error);
        // expected output: ReferenceError: nonExistentFunction is not defined
        // Note - error messages will vary depending on browser
        res.json({ "message": "Algo ha salido mal" });
    }  

})



module.exports = router;