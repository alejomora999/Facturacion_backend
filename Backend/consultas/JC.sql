SELECT p.id, p.nombre , p.descripcion, p.precio_unidad, p.id_categoria, p.codigo, i.cantidad_disponible, c.iva  
        FROM INVENTARIO i INNER JOIN PRODUCTO p ON i.ID_PRODUCTO = p.ID
        INNER JOIN categoria c ON p.ID_CATEGORIA = c.ID_CATEGORIA
        WHERE p.state=:state ORDER BY p.id DESC;
        
SELECT * FROM producto;

SELECT * FROM inventario;

SELECT p.id, p.nombre , p.descripcion, p.precio_unidad, p.id_categoria, 
        p.codigo, i.cantidad_disponible, c.iva, i.state  
        FROM INVENTARIO i INNER JOIN PRODUCTO p ON i.ID_PRODUCTO = p.ID
        INNER JOIN categoria c ON p.ID_CATEGORIA = c.ID_CATEGORIA
        ORDER BY p.id DESC;

UPDATE inventario i SET i.state = 1 WHERE i.id_producto = 2;

select s1.username || '@' || s1.machine || ' ( SID=' || s1.sid || ') is blocking'
       || s2.username || '@' || s2.machine || '( SID=' || s2.sid || ')' from
       v$lock l1, v$session s1, v$lock l2, v$session s2
       where s1.sid=l1.sid and s2.sid=l2.sid
       and l1.block=1 and l2.request > 0
       and l1.id1=l2.id1
       and l2.id2=l2.id2;
       
select s1.username || '@' || s1.machine || ' ( SID=' || s1.sid || ') is blocking'
        || s2.username || '@' || s2.machine || '( SID=' || s2.sid || ')' from
       gv$lock l1, gv$session s1, gv$lock l2, gv$session s2
       where s1.sid=l1.sid and s2.sid=l2.sid
       and l1.block=1 and l2.request > 0
       and l1.id1=l2.id1
       and l2.id2=l2.id2;

 select sid,
        decode(state, 'WAITING','Waiting',
                'Working') state,
        decode(state,
                'WAITING',
                'So far '||seconds_in_wait,
                'Last waited '||
                wait_time/100)||
        ' secs for '||event
        "Description"
from v$session
where username = 'hr';

DELETE FROM PRODUCTO p WHERE id = 1;

SELECT * FROM PERSONA p ;

INSERT INTO PERSONA VALUES (2, 'Yurany', 'Morales', '10102256713', '3231454', CURRENT_TIMESTAMP, 1);
INSERT INTO PERSONA VALUES (3, 'Alejandro', 'Morales', '10102256713', '3231454', CURRENT_TIMESTAMP, 1);
INSERT INTO PERSONA VALUES (4, 'Camilo', 'Reyes', '1010225712', '3231456', CURRENT_TIMESTAMP, 1);

SELECT * FROM CLIENTE c ;
UPDATE cliente set id_persona = 3 where id_cliente = 1;
commit;
INSERT INTO cliente values (1,CURRENT_TIMESTAMP, 2, 1);
INSERT INTO cliente values (2,CURRENT_TIMESTAMP, 4, 1, 'juancsr@protonmail.com');

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