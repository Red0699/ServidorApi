const express = require('express');
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");

//rutas
const peliculasRoutes = require('./routes/peliculas');

//cors
const cors = require("cors");

//swagger
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerSpec = {
    definition : {
        openapi: "3.0.0",
        info: {
            title: "Api Peliculas",
            version: "1.0.0"
        },
        servers: [
            {
                url: "http://localhost:3000"
            }
        ]
    },
    apis: [`${path.join(__dirname, "./routes/*.js")}`]
}

//middlewares
app.use(express.json());
app.use('/api', peliculasRoutes);
app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)));

//routes
app.get('/', (req,res) => {
    res.send("Prueba de API");
});


/*
app.use(cors({
    //origin: 'http://192.168.20.29:4200',
    origin: ''
}));
*/

app.use(cors());



app.listen(port, () => console.log('Servidor escuchando en', port));