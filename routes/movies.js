const express = require('express')
const validate = require('../middelware/validate.js');


const router = express.Router()

const { generateUniqueId } = require('../utils')
const { movies } = require('../data')

router.get('/',
(req, res) => {
	res.json(Object.values(movies))
})

router.get('/:id',validate.validateUUID("id"),validate.validate,

(req, res) => {
	const { id } = req.params
	const movie = movies[id]

	if (!movie) {
		return res.status(404).json({ error: 'Movie not found' })
	}

	res.json(movie)
})

router.post('/', validate.validarBody("title"),validate.validate,

(req, res) => {
	const newMovieId = generateUniqueId()
	const { title, year, genreId, director } = req.body
	const newMovie = { id: newMovieId, title, year, genreId, director }

	movies[newMovieId] = newMovie

	res.status(201).json(newMovie)
})

router.put('/:id', validate.validarBody("title"),
validate.validateUUID("id"),validate.validate,

(req, res) => {
	const { id } = req.params
	const updatedMovieData = req.body
	const movie = movies[id]

	if (!movie) {
		return res.status(404).json({ error: 'Movie not found' })
	}

	movies[id] = { ...movie, ...updatedMovieData }
	res.json(movies[id])
})

router.delete('/:id',validate.validt,


(req, res) => {
	const { id } = req.params
	const movie = movies[id]

	if (!movie) {
		return res.status(404).json({ error: 'Movie not found' })
	}

	delete movies[id]

	res.status(200).send(movie)
})

module.exports = router
