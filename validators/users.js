const { body } = require('express-validator')
const { users } = require('../data')
const bcrypt = require('bcrypt')

const usernameExists = (value) => {
	if (users[value]) {
		throw new Error('Username already exists')
	}
	return true
}

const hasUpperCase = (value) =>
	[...value].some((char) => char.toUpperCase() !== char)
const hasLowerCase = (value) =>
	[...value].some((char) => char.toLowerCase() !== char)
const hasDigit = (value) =>
	[...value].some((char) => !isNaN(parseInt(char)))

const isSecurePassword = (value) =>
	hasUpperCase(value) && hasLowerCase(value) && hasDigit(value)

const passwordSecure = body('password').custom((value) => {
	if (!isSecurePassword(value)) {
		throw new Error(
			'The password must contain at least one uppercase letter, one lowercase letter, and one digit'
		)
	}
	return true
})

const passwordLength = body('password')
	.isLength({ min: 6 })
	.withMessage('Password must be at least 6 characters long')

const userBodySchema = [
	body('username')
		.trim()
		.notEmpty()
		.withMessage('Username is required')
		.custom(usernameExists),
	passwordSecure,
	passwordLength,
]

module.exports = { userBodySchema }
