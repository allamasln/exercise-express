const express = require('express')

const { validate } = require('../middleware/validation')
const {
	genreBodySchema,
	validateGenreDeletion,
} = require('../validators/genres')
const { idParamSchema } = require('../validators/commons')

const {
	getAllGenres,
	getGenreById,
	createGenre,
	updateGenre,
	deleteGenre,
} = require('../controllers/genres')

const router = express.Router()

const ENTITY_NAME = 'Genre'

router.get('/', getAllGenres)

router.get('/:id', idParamSchema(ENTITY_NAME), validate, getGenreById)

router.post('/', genreBodySchema, validate, createGenre)

router.put(
	'/:id',
	idParamSchema(ENTITY_NAME),
	genreBodySchema,
	validate,
	updateGenre
)

router.delete(
	'/:id',
	idParamSchema(ENTITY_NAME),
	validateGenreDeletion,
	validate,
	deleteGenre
)

module.exports = router
