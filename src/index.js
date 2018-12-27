const express = require('express');
const morgan  = require('morgan');
const path = require('path');

const app= express();

app.set('port', process.env.PORT || 4000);

// Db connection
const { mongoose } = require('./database');

app.use(morgan('dev'));
app.use(express.json());

app.use('/api/jugadas', require('./routes/peticiones.routes'));

app.use(express.static(path.join(__dirname, 'public')));;

app.listen(app.get('port'),() => {
    console.log(`Server on port ${app.get('port')}`);
});


