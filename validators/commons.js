const { param } = require('express-validator')
const { movies, genres } = require('../data')

const idParamSchema = (entity) =>
	param('id')
		.notEmpty()
		.withMessage(`${entity} ID is required`)
		.isUUID(4)
		.withMessage(`Invalid ${entity} ID format`)
		.custom((value) => {
			console.log({ movies, genres })
			const resources = entity === 'Genre' ? genres : movies
			if (!resources[value]) {
				throw new Error(
					`${
						entity.charAt(0).toUpperCase() + entity.slice(1)
					} not found`
				)
			}
			return true
		})

module.exports = {
	idParamSchema,
}
