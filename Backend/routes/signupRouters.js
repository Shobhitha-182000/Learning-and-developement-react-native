const express = require('express');
const router = express.Router();
const signupController = require('../controllers/signupControllers');

router.post('/studysignup', signupController.createSignup);
router.get('/studysignups', signupController.getAllSignups);
router.post('/studylogin', signupController.login);



module.exports = router;
