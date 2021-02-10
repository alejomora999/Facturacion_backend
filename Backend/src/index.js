const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express(); //instancia de express

//imports
const personRoutes = require('./routes/person-rotes');
const FacturaRoutes = require('./routes/factura-rotes');
const loginRoutes = require('./routes/login-rotes');
const productoRoutes = require('./routes/producto-route');
const clienteRoutes = require('./routes/cliente-route');
const operadorRoutes = require('./routes/operador-route');
//settings
app.set('port', process.env.PORT || 3010);

//middlewares
app.use(morgan('dev')); //paso por morgan antes del llegar al end point
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use(personRoutes);
app.use(FacturaRoutes);
app.use(loginRoutes);
app.use(productoRoutes);
app.use(clienteRoutes);
app.use(operadorRoutes);

//run
app.listen(app.get('port'), () => {
    console.log(`Server on Port ${app.get('port')}`)
})

