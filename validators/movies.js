const { body } = require('express-validator')
const { genres } = require('../data')

const genreExists = (value) => {
	if (!genres[value]) {
		throw new Error('Genre does not exist')
	}
	return true
}

const movieBodySchema = [
	body('title').trim().notEmpty().withMessage('Title is required'),
	body('year')
		.isInt({ max: new Date().getFullYear() })
		.withMessage(
			'Year must be a valid integer until the current year'
		),
	body('genreId')
		.isUUID(4)
		.withMessage('Genre ID must be a valid UUID')
		.custom(genreExists),
	body('director')
		.trim()
		.notEmpty()
		.withMessage('Director is required'),
]

module.exports = { movieBodySchema }
