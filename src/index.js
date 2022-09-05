const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
const peliculasRoutes = require('./routes/peliculas');
const path = require("path");

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
                url: "http://192.168.20.29:5000"
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


app.use(cors({
    origin: 'http://localhost:3000'
}));


//conexion mongoose
mongoose
.connect(process.env.MONGODB_URI)
.then(() => console.log('Conectado a MongoDB Atlas'))
.catch((error) => console.error(error));

app.listen(port, () => console.log('Servidor escuchando en', port));