const express = require('express');

const { login } = require('../controllers/auth.js');

const router = express.Router();

//send data from front end to back end
router.post('./login', login);

//export router
module.exports = router;

