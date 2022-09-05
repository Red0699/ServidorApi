const express = require("express");
const peliculaSchema = require("../models/pelicula");

const router = express.Router();

//Crear usuario
/**
 * @swagger
 * components:
 *  schemas:
 *      Pelicula:
 *          type: object
 *          properties:
 *              nombre:
 *                  type: string
 *                  description: nombre de la pelicula
 *              descripcion:
 *                  type: string
 *                  description: descripcion de la pelicula
 *              categoria:
 *                  type: string
 *                  description: categoria de la pelicula
 *              director:
 *                  type: string
 *                  description: director de la pelicula
 *          required:
 *              - nombre
 *              - descripcion
 *              - categoria
 *              - director
 *          example:
 *              nombre: Batman
 *              descripcion: Caballero de la noche
 *              categoria: Accion
 *              director: Pepito
 * 
 */

/**
 * @swagger
 * /api/peliculas:
 *  post:
 *      summary: crear una nueva pelicula
 *      tags: [Pelicula]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref : '#/components/schemas/Pelicula'
 *      responses:
 *          200:
 *              description: la pelicula ha sido creada
 * 
 */
router.post('/peliculas', (req,res) => {
    const pelicula = peliculaSchema(req.body);
    pelicula
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

/**
 * @swagger
 * /api/peliculas:
 *  get:
 *      summary: retorna todas las peliculas
 *      tags: [Pelicula]
 *      responses:
 *          200:
 *              description: Todas las peliculas
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref : '#/components/schemas/Pelicula'
 * 
 */

//obtener todas las peliculas
router.get('/peliculas', (req,res) => {
    peliculaSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

/**
 * @swagger
 * /api/peliculas/{id}:
 *  get:
 *      summary: retorna una pelicula
 *      tags: [Pelicula]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: El ID de la pelicula
 *      responses:
 *          200:
 *              description: Consulta una pelicula
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref : '#/components/schemas/Pelicula'
 *          404:
 *              description: Pelicula no encontrada
 */

//obtener pelicula
router.get('/peliculas/:id', (req,res) => {
    const { id } = req.params
    peliculaSchema
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

/**
 * @swagger
 * /api/peliculas/{id}:
 *  put:
 *      summary: actualizar una pelicula
 *      tags: [Pelicula]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: El ID de la pelicula
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref : '#/components/schemas/Pelicula'
 *      responses:
 *            200:
 *               description: Pelicula actualizada
 *            404:
 *               description: Pelicula no encontrada
 */

//actualizar pelicula
router.put('/peliculas/:id', (req,res) => {
    const { id } = req.params
    const { nombre,descripcion, categoria, director } = req.body
    peliculaSchema
        .updateOne({ _id: id }, { $set: { nombre,descripcion, categoria, director } })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

/**
 * @swagger
 * /api/peliculas/{id}:
 *  delete:
 *      summary: eliminar una pelicula
 *      tags: [Pelicula]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: El ID de la pelicula
 *      responses:
 *            200:
 *               description: Pelicula eliminada
 *            404:
 *               description: Pelicula no encontrada
 */

//eliminar pelicula
router.delete('/peliculas/:id', (req,res) => {
    const { id } = req.params
    peliculaSchema
        .remove({ _id: id })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

module.exports = router;