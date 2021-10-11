
const router = require('express').Router();
const {verifyToken } =require('../middlewares/authJwt')
const {checkIsValidUpdate} = require('../middlewares/userValidator');

module.exports = router