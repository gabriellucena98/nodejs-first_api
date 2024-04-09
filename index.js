//config inicial
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

const personRoutes = require('./routes/personRoutes');

// Ler JSON
app.use(
    express.urlencoded({
        extended: true,
    }),
);

app.use(express.json());

//rotas da API
app.use('/person', personRoutes);

// Rota para acessar a api
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.sst2esn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
.then(() => {
    console.log('Conectamos ao MongoDB');
    app.listen(3000);
})
.catch((err) => {
    console.log(err);
});