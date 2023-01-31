const express = require('express')
const router = express.Router()

const { logIn,forgetPassword,restorePassword } = require('../controllers/auth.controller')

const { registerUser } = require('../controllers/users.controller')

router.post('/login', logIn)
router.post('/sign-up', registerUser)

router.get('/forget-password', forgetPassword)

router.post('/change-password/:token', restorePassword)
// router.post('/update-password', authServices.postRecoveryToken)
// router.patch('/recovery-password/:id', authServices.patchPassword)
// router.get('/verify-user/:id', verifyUser)

module.exports = router
