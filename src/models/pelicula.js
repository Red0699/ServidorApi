const mongoose = require("mongoose");

const peliculaSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: true
    },
    descripcion:{
        type: String,
        required: true
    },
    categoria:{
        type: String,
        required: true
    },
    director:{
        type: String,
        required: true
    },
    
});

module.exports = mongoose.model('Pelicula', peliculaSchema);