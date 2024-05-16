const express = require('express')

const { movieBodySchema } = require('../validators/movies')
const { idParamSchema } = require('../validators/commons')
const { validate } = require('../middleware/validation')

const {
	getAllMovies,
	getMovieById,
	createMovie,
	updateMovie,
	deleteMovie,
} = require('../controllers/movies')

const router = express.Router()

const ENTITY_NAME = 'Movie'

router.get('/', getAllMovies)

router.get('/:id', idParamSchema(ENTITY_NAME), validate, getMovieById)

router.post('/', movieBodySchema, validate, createMovie)

router.put(
	'/:id',
	idParamSchema(ENTITY_NAME),
	movieBodySchema,
	validate,
	updateMovie
)

router.delete(
	'/:id',
	idParamSchema(ENTITY_NAME),
	validate,
	deleteMovie
)

module.exports = router
