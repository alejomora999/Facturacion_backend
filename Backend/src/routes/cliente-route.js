const { Router } = require('express');
const router = Router();
const BD = require('../config/configbd');

const getAllClientes = async () => {
    sql = `select c.id_cliente, c.id_persona, UPPER(p.nombres), UPPER(p.apellidos), 
            p.numero_identificacion, p.telefono, 
            to_char(p.fecha_nacimiento, 'dd-mm-YYYY') AS fecha_nacimiento
        from cliente c, persona p 
        where c.id_persona = p.id_persona and c.state = 1 
        order by p.id_persona
        `;
    const result = await BD.Open(sql, [], false);
    const clientes = result.rows.map((cliente) => ({
        'id_cliente': cliente[0],
        'id_persona': cliente[1],
        'nombres': cliente[2],
        'apellidos': cliente[3],
        'numero_identificacion': cliente[4],
        'telefono': cliente[5],
        'fecha_nacimiento': cliente[6],
    }));
    return clientes;
}

//READ clientes
router.get('/getClientes', async (req, res) => { //get y post => nombre apellido js sincrono
    const clientes = await getAllClientes();
    res.json(clientes);
});

module.exports = router;