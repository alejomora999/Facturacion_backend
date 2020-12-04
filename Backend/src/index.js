const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express(); //instancia de express

//imports
const personRoutes = require('./routes/person-rotes');
const FacturaRoutes = require('./routes/factura-rotes');
const loginRoutes = require('./routes/login-rotes');
//settings
app.set('port', 3010);

//middlewares
app.use(morgan('dev')); //paso por morgan antes del llegar al end point
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use(personRoutes);
app.use(FacturaRoutes);
app.use(loginRoutes);



//run
app.listen(app.get('port'), () => {
    console.log('Server on Port 3010')
})

