const express = require('express')
const { generateUniqueId } = require('../utils')
const { movies, genres } = require('../data')

const ENTITY_NAME = 'Movie'

const getAllMovies = (req, res) => {
	const moviesWithGenres = Object.values(movies).map((movie) => {
		const genreName = genres[movie.genreId]?.name
		return { ...movie, genre: genreName || 'Unknown' }
	})
	res.json(moviesWithGenres)
}

const getMovieById = (req, res) => {
	const movie = movies[req.params.id]

	if (!movie) {
		return res.status(404).json({ error: `${ENTITY_NAME} not found` })
	}

	const genreName = genres[movie.genreId]?.name || 'Unknown'
	const movieWithGenre = { ...movie, genre: genreName }

	res.json(movieWithGenre)
}

const createMovie = (req, res) => {
	const id = generateUniqueId()

	const { title, year, genreId, director } = req.body
	const newMovie = { id, title, year, genreId, director }

	movies[id] = newMovie

	res.status(201).json(newMovie)
}

const updateMovie = (req, res) => {
	const { id } = req.params
	const updatedMovieData = req.body

	const movie = movies[id]

	if (!movie) {
		return res.status(404).json({ error: `${ENTITY_NAME} not found` })
	}

	movies[id] = { ...movie, ...updatedMovieData }

	res.json(movies[id])
}

const deleteMovie = (req, res) => {
	const { id } = req.params
	const movie = movies[id]

	if (!movie) {
		return res.status(404).json({ error: `${ENTITY_NAME} not found` })
	}

	delete movies[id]

	res.status(200).send(movie)
}

module.exports = {
	getAllMovies,
	getMovieById,
	createMovie,
	updateMovie,
	deleteMovie,
}
