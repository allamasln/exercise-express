const { validate } = require('../middleware/validation')
const { generateUniqueId } = require('../utils')
const { genres } = require('../data')

const ENTITY_NAME = 'Genre'

const getAllGenres = (req, res) => {
	res.json(Object.values(genres))
}

const getGenreById = (req, res) => {
	const genre = genres[req.params.id]

	if (!genre) {
		return res.status(404).json({ error: `${ENTITY_NAME} not found` })
	}

	res.json(genre)
}

const createGenre = (req, res) => {
	const id = generateUniqueId()

	const { name } = req.body
	const newGenre = { id, name }

	genres[id] = newGenre

	res.status(201).json(newGenre)
}

const updateGenre = (req, res) => {
	const { id } = req.params
	const updatedGenreData = req.body
	const genre = genres[id]

	if (!genre) {
		return res.status(404).json({ error: `${ENTITY_NAME} not found` })
	}

	genres[id] = { ...genre, ...updatedGenreData }
	res.json(genres[id])
}

const deleteGenre = (req, res) => {
	const { id } = req.params
	const genre = genres[id]

	delete genres[id]

	res.status(200).send(genre)
}

module.exports = {
	getAllGenres,
	getGenreById,
	createGenre,
	updateGenre,
	deleteGenre,
}
