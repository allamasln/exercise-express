const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { users } = require('../data')

const { userBodySchema } = require('../validators/users')
const { validate } = require('../middleware/validation')
const jwtPrivateKey = 'cocacola'

const router = express.Router()

async function hashPassword(passwordPlainText) {
	const salt = await bcrypt.genSalt(10)
	const hash = await bcrypt.hash(passwordPlainText, salt)

	return hash
}

function generateJWT(payload) {
	return jwt.sign(payload, jwtPrivateKey)
}

router.post(
	'/register',
	userBodySchema,
	validate,
	async (req, res) => {
		const { username, password: passwordPlainText } = req.body

		if (users[username])
			return res.status(400).json({
				message:
					'An error occurred while registering user. Please try again.',
			})

		const password = await hashPassword(passwordPlainText)

		users[username] = { username, password }

		const token = generateJWT({ username })

		console.log({ users, token })

		res.setHeader('x-auth-token', token)
		res.status(201).json({ message: 'User registered.' })
	}
)

router.post('/login', async (req, res) => {
	const { username, password: passwordPlainText } = req.body

	if (!users[username])
		return res
			.status(400)
			.json({ message: 'Invalid username or password.' })

	const hashDB = users[username].password

	const isAuth = await bcrypt.compare(passwordPlainText, hashDB)

	if (!isAuth)
		return res
			.status(400)
			.json({ message: 'Invalid username or password.' })

	const token = generateJWT({ username })

	res.setHeader('x-auth-token', token)
	res.status(201).json({ message: 'User logged in.' })
})

module.exports = router
