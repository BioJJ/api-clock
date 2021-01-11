require('dotenv-flow').config();
const express = require('express');
const cors = require('cors');
const db = require('./config/database');



console.log(process.env.DATABASE_URL);

const app = express();

async function createTable(){

    const response =  await db.query(
        'create table if not exists clock_save('+
        'id SERIAL PRIMARY KEY,'+
        'horas VARCHAR(50) NOT NULL,'+
        'minutos VARCHAR(50) NOT NULL,'+
        'angulo VARCHAR(50) NOT NULL,'+
        'dt timestamp)'
    ).then(res => console.log(res)).catch(err => console.log(err))
}

// ==> Rotas da API:
const index = require('./routes/index');
const clocktRoute = require('./routes/clock.routes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json({ type: 'application/vnd.api+json' }));
app.use(cors());
setTimeout(() => {
    createTable();
}, 2000);
app.use(index);
app.use('/api/', clocktRoute);

module.exports = app;