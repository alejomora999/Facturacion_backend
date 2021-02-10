SELECT p.id, p.nombre , p.descripcion, p.precio_unidad, p.id_categoria, p.codigo, i.cantidad_disponible, c.iva  
        FROM INVENTARIO i INNER JOIN PRODUCTO p ON i.ID_PRODUCTO = p.ID
        INNER JOIN categoria c ON p.ID_CATEGORIA = c.ID_CATEGORIA
        WHERE p.state=:state ORDER BY p.id DESC;
        
SELECT * FROM producto;

SELECT * FROM inventario;

DELETE FROM PRODUCTO p WHERE id = 1;

SELECT * FROM PERSONA p ;

INSERT INTO PERSONA VALUES (2, 'Yurany', 'Morales', '10102256713', '3231454', CURRENT_TIMESTAMP, 1);

SELECT * FROM CLIENTE c ;
INSERT INTO cliente values (1,CURRENT_TIMESTAMP, 2, 1);

SELECT * FROM operador;
INSERT INTO operador values (1,'VENDEDOR', 1, 1,'juancsr', 'juancsr');

select o.id_operador, o.id_persona, UPPER(p.nombres), UPPER(p.apellidos),
            p.numero_identificacion, p.telefono, 
            to_char(p.fecha_nacimiento, 'dd-mm-YYYY') AS fecha_nacimiento
            from operador o, persona p 
            where o.id_persona = p.id_persona and o.state = 1 AND o.rol = 'VENDEDOR'
            order by p.id_persona;
commit;

select * from factura;

alter table factura
  add codigo varchar(25) not null;
  
alter table producto
  add codigo varchar(25) default '0' not null;
  
 
 alter table inventario
  add descripcion varchar(25) default 'producto registrado' not null;