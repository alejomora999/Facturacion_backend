const { Router } = require('express');
const router = Router();
const BD = require('../config/configbd');

const getAllOperadores = async (rol='VENDEDOR') => {
    sql = `select o.id_operador, o.id_persona, UPPER(p.nombres), UPPER(p.apellidos),
            p.numero_identificacion, p.telefono, 
            to_char(p.fecha_nacimiento, 'dd-mm-YYYY') AS fecha_nacimiento
            from operador o, persona p 
            where o.id_persona = p.id_persona and o.state = 1 AND o.rol = '${rol}'
            order by p.id_persona
        `;
    const result = await BD.Open(sql, [], false);
    console.log(result.rows);
    const operadores = result.rows.map((operador) => ({
        'id_vendedor': operador[0],
        'id_persona': operador[1],
        'nombres': operador[2],
        'apellidos': operador[3],
        'numero_identificacion': operador[4],
        'telefono': operador[5],
        'fecha_nacimiento': operador[6],
    }));
    return operadores;
}

//READ clientes
router.get('/getVendedores', async (req, res) => { //get y post => nombre apellido js sincrono
    const vendedores = await getAllOperadores();
    res.json(vendedores);
});

module.exports = router;