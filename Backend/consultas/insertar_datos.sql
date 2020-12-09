SELECT * FROM persona;

-- Factura
SELECT * FROM factura;

UPDATE factura SET vendedor='21' WHERE id_factura = 2;

UPDATE factura SET vendedor='21' WHERE id_factura = 22;

INSERT INTO factura (fecha_compra, id_pedido, estado, state, vendedor, codigo)
    VALUES (TO_DATE('2010-01-01', 'YYYY-MM-DD'), 2, 'EN PROCESO', 1, '21', 'ABC');
commit;

DELETE FROM factura WHERE id_factura = 2;

SELECT DISTINCT factura.id_factura, factura.codigo, factura.vendedor, 
    UPPER(aux_o.nombre_completo) as vendedor,
        UPPER(persona.nombres||' '||persona.apellidos) AS cliente,
        REPLACE(REPLACE(factura.state,1,'HABILITADA'), 0, 'ANULADA') AS estado, 
        factura.fecha_compra AS fecha_registro, factura.fecha_compra AS fecha_compra, 
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
        AND producto.id_categoria=categoria.id_categoria;

-- PROTOTIPOS (INSERT VACIOS)
INSERT INTO persona(NOMBRES, APELLIDOS, NUMERO_IDENTIFICACION, TELEFONO, FECHA_NACIMIENTO, STATE)
	VALUES ();

-- Vendedores
SELECT * FROM OPERADOR o ;
	
INSERT INTO persona(NOMBRES, APELLIDOS, NUMERO_IDENTIFICACION, TELEFONO, FECHA_NACIMIENTO, STATE)
	VALUES ('Luis', 'Sabogal', '3468424', '3229472829', TO_DATE('2020-11-28', 'YYYY-MM-DD'), 1);
INSERT INTO OPERADOR (ROL, ID_PERSONA, STATE, USERNAME, PASSWORD)
	VALUES ('VENDEDOR', 29, 1, 'lsabogal', 'lsabogal');

INSERT INTO persona(NOMBRES, APELLIDOS, NUMERO_IDENTIFICACION, TELEFONO, FECHA_NACIMIENTO, STATE)
	VALUES ('Edison', 'Reyes', '4741480', '313545643', TO_DATE('2020-11-28', 'YYYY-MM-DD'), 1);
INSERT INTO OPERADOR (ROL, ID_PERSONA, STATE, USERNAME, PASSWORD)
	VALUES ('VENDEDOR', 30, 1, 'ereyes', 'ereyes');

-- Clientes
SELECT * FROM CLIENTE c2 ;

INSERT INTO persona(NOMBRES, APELLIDOS, NUMERO_IDENTIFICACION, TELEFONO, FECHA_NACIMIENTO, STATE)
	VALUES ('Mariela', 'Reyes', '1123453', '742345', TO_DATE('2020-11-28', 'YYYY-MM-DD'), 1);
INSERT INTO CLIENTE (FECHA_REGISTRO, ID_PERSONA, STATE)
	VALUES (TO_DATE('1990-11-28', 'YYYY-MM-DD'), 31, 1);

INSERT INTO persona(NOMBRES, APELLIDOS, NUMERO_IDENTIFICACION, TELEFONO, FECHA_NACIMIENTO, STATE)
	VALUES ('Eduardo', 'Galeano', '644657', '742345', TO_DATE('2020-11-28', 'YYYY-MM-DD'), 1);
INSERT INTO CLIENTE (FECHA_REGISTRO, ID_PERSONA, STATE)
	VALUES (TO_DATE('1990-10-28', 'YYYY-MM-DD'), 32, 1);
	
INSERT INTO persona(NOMBRES, APELLIDOS, NUMERO_IDENTIFICACION, TELEFONO, FECHA_NACIMIENTO, STATE)
	VALUES ('Armando', 'Moreno', '6233234', '742345', TO_DATE('2020-11-28', 'YYYY-MM-DD'), 1);
INSERT INTO CLIENTE (FECHA_REGISTRO, ID_PERSONA, STATE)
	VALUES (TO_DATE('1990-01-01', 'YYYY-MM-DD'), 33, 1);
