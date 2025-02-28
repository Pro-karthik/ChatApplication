const express = require('express')
const authenticate = require('../middleware/authenticate')
const userAddFrndController = require('../controllers/userAddFrndController')
const userGetFrndController = require('../controllers/userGetFrndController')
const userGetProfileController = require('../controllers/userGetProfileController')
const userConversationController = require('../controllers/userConversationController')
const router = express.Router()

router.post('/addFriends',authenticate,userAddFrndController)

router.get('/getFriends',authenticate,userGetFrndController)

router.get('/profile',authenticate,userGetProfileController)

router.post('/conversation',authenticate,userConversationController)

module.exports = router