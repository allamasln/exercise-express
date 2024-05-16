const { body, param } = require('express-validator')
const { movies } = require('../data')

const genreHasMovies = (value) => {
	console.log(value)
	if (
		Object.values(movies).some((movie) => movie.genreId === value)
	) {
		throw new Error('Cannot delete genre with associated movies')
	}
	return true
}

const genreBodySchema = [
	body('name')
		.trim()
		.notEmpty()
		.withMessage('Genre name is required')
		.isLength({ min: 5 })
		.withMessage('Genre name must be at least 5 characters long'),
]

const validateGenreDeletion = [param('id').custom(genreHasMovies)]

module.exports = { genreBodySchema, validateGenreDeletion }
