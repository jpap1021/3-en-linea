const express = require('express');
const morgan  = require('morgan');

const app= express();

app.set('port', process.env.PORT || 3000);

// Db connection
const { mongoose } = require('./database');

app.use(morgan('dev'));
app.use(express.json());

app.use('/api/jugadas', require('./routes/peticiones.routes'));


app.listen(app.get('port'),() => {
    console.log(`Server on port ${app.get('port')}`);
});


