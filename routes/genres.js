const express = require('express')

const router = express.Router()
const { generateUniqueId } = require('../utils')
const { genres } = require('../data');
const validate = require('../middelware/validate.js');

router.get('/',
 (req, res) => {
	res.json(Object.values(genres))
})



router.get('/:id', validate.validt,validate.validate,
(req, res) => {
	const { id } = req.params
	const genre = genres[id]

	if (!genre) {
		return res.status(404).json({ error: 'Genre not found' })
	}

	res.json(genre)
})

router.post('/',validate.validarBody("name"),validate.validate,
 (req, res) => {
	const newGenreId = generateUniqueId()
	const { name } = req.body
	const newGenre = { id: newGenreId, name }
	genres[newGenreId] = newGenre
	res.status(201).json(newGenre)
})


router.put(
	'/:id',
	validate.validateUUID("id"),validate.validarBody("name")
	,
	validate.validate, 
	(req, res) => {
	const { id } = req.params
    const updatedGenreData = req.body
    const genre = genres[id]

    if (!genre) {
        return res.status(404).json({ error: 'Genre not found' })
    }

    genres[id] = { ...genre, ...updatedGenreData }
    res.json(genres[id])
})

router.delete('/:id',validate.validt,validate.validate,
	 (req, res) => {
	const { id } = req.params
	const genre = genres[id]

	if (!genre) {
		return res.status(404).json({ error: 'Genre not found' })
	}

	delete genres[id]
	res.status(200).send(genre)
})

module.exports = router
