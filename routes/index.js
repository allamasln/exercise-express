const express = require('express')

const router = express.Router()

router.use('/health', require('./testing'))
router.use('/movies', require('./movies'))
router.use('/genres', require('./genres'))
router.use(require('./users'))

module.exports = router
