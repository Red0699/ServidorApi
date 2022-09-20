const conexion = require('../connection/conexion');

const peliculaSchema = {};

//Listar todos los peliculas
peliculaSchema.getPeliculas = function(callback){
    if(conexion){
        var sql = "SELECT * FROM pelicula ORDER BY idPelicula";
        conexion.query(sql, function(error, rows){
            if(error){
                throw error;
            }else{
                callback(null, rows);
            }
        });
    }
}

//Agregar una nueva pelicula
peliculaSchema.insertPelicula = function(data, callback){
    if(conexion){
        var sql = "INSERT INTO pelicula SET ?";

        conexion.query(sql, data, function(error, result){
            if(error){
                throw error;
            }else{
                callback(null, {"msg": "Registro Insertado"});
            }
        });
    }
}

//Obtener un pelicula
peliculaSchema.getPelicula = function(id, callback){
    if(conexion){
        var sql = "SELECT * FROM pelicula WHERE idPelicula = " + conexion.escape(id) + ";";
        conexion.query(sql, function(error, row){
            if(error){
                throw error;
            }else{
                callback(null, row);
            }
        });
    }
}

//actualizar un pelicula
peliculaSchema.updatePelicula = function(id ,data, callback){
    if(conexion){
        var sql = "UPDATE pelicula SET "
                    + "nombre = " + conexion.escape(data.nombre)
                    + ", descripcion = " + conexion.escape(data.descripcion)
                    + ", categoria = " + conexion.escape(data.categoria)
                    + ", director = " + conexion.escape(data.director)
                    + " WHERE idPelicula = " + conexion.escape(id) + ";";
        conexion.query(sql, function(error, result){
            if(error){
                throw error;
            }else{
                callback(null, {"msg": "pelicula actualizado"})
            }
        });
    }

}

peliculaSchema.deletePelicula = function(id, callback){
    if(conexion){
        var sql = "DELETE FROM pelicula WHERE idPelicula = " + conexion.escape(id) + ";";

        conexion.query(sql, function(error, result){
            if(error){
                throw error;
            }else{
                callback(null, {"msg": "pelicula actualizado"})
            }
        });
    }
}


module.exports = peliculaSchema;