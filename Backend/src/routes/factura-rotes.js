router.get('/getFactura', async (req, res) => { //get y post => nombre apellido js sincrono
    //sql = "SELECT nombres||' '||apellidos from persona WHERE STATE=1";
    sql = `SELECT DISTINCT factura.id_factura, factura.vendedor, 
            persona.nombres||' '||persona.apellidos AS cliente,REPLACE(REPLACE(factura.state,1,'HABILITADA'), 0, 'ANULADA') AS estado, 
            factura.fecha_compra AS fecha_registro, factura.fecha_compra AS fecha_compra, 
            (SELECT  '$'||sum((((categoria.iva/100)+1)*(producto.precio_unidad*producto_pedido_cliente.cantidad_producto))) 
        FROM cliente, persona, pedido_cliente, pago, producto_pedido_cliente, producto, categoria, factura 
        WHERE cliente.id_persona=persona.id_persona 
            AND pedido_cliente.id_cliente=cliente.id_cliente 
            AND pedido_cliente.id_pedido=factura.id_pedido 
            AND pedido_cliente.id_pedido=pago.id_pedido 
            AND pedido_cliente.id_pedido=producto_pedido_cliente.id_pedido 
            AND producto_pedido_cliente.id_producto=producto.id 
            AND producto.id_categoria=categoria.id_categoria) AS TOTAL_SUMA_TOTAL FROM cliente, persona,pedido_cliente, pago, producto_pedido_cliente, producto, categoria, factura WHERE cliente.id_persona=persona.id_persona 
            AND pedido_cliente.id_cliente=cliente.id_cliente 
            AND pedido_cliente.id_pedido=factura.id_pedido 
            AND pedido_cliente.id_pedido=pago.id_pedido 
            AND pedido_cliente.id_pedido=producto_pedido_cliente.id_pedido 
            AND producto_pedido_cliente.id_producto=producto.id 
            AND producto.id_categoria=categoria.id_categoria`
});


const getFacturas = async (state='') => {
    let where_statement = state ? `AND factura.state=${state}` : '';
    
    sql = `SELECT DISTINCT factura.id_factura, factura.codigo, UPPER(aux_o.nombre_completo) as vendedor,
        UPPER(persona.nombres||' '||persona.apellidos) AS cliente,
        REPLACE(REPLACE(factura.state,1,'HABILITADA'), 0, 'ANULADA') AS estado,
        to_char(factura.fecha_compra, 'dd-mm-YYYY') AS fecha_registro, 
        to_char(factura.fecha_compra, 'dd-mm-YYYY') AS fecha_compra,
        SUM ((((categoria.iva/100)*producto.precio_unidad)+producto.precio_unidad)*producto_pedido_cliente.cantidad_producto) AS total
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
        AND producto.id_categoria=categoria.id_categoria ${where_statement}
        GROUP BY factura.id_factura, factura.codigo, aux_o.nombre_completo, UPPER(persona.nombres||' '||persona.apellidos),
            factura.state, factura.fecha_compra
        ORDER BY factura.id_factura DESC
        `;
    console.log(sql);
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