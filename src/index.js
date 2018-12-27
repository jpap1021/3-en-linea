const express = require('express');

const app= express();

app.set('port', process.env.PORT || 3000);

// Db connection
const { mongoose } = require('./database')

app.listen(app.get('port'),() => {
    console.log(`Server on port ${app.get('port')}`);
});


