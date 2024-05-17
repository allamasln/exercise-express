const { validationResult } = require('express-validator');
const { param, body } = require('express-validator');

function validate( req,res,next){
    console.log(req.params)
        const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    
    next()
}

const validt =[
	param("id").notEmpty()
	.withMessage(` ID is required`)
	.isUUID(4)
	.withMessage(`Invalid  ID format`)]

const validateUUID = (paramName)=>{
	return [param(paramName)
.notEmpty()
.withMessage(`${paramName} ID is required`)
.isUUID(4)
.withMessage(`Invalid ${paramName} ID format`)]}

const validarBody = (bodyName)=>{
	return [
		body(bodyName)
		.notEmpty()
		.withMessage(` ${bodyName} is required`)
.isLength({ min: 5 })
.withMessage('Genre name must be at least 5 characters long')
	]
}

module.exports = {validate,validarBody,validateUUID,validt}