const { signup_get, 
        signup_post, 
        login_get, 
        login_post} = require('../controllers/authContoller');
const router = require('express').Router();

router.get('/signup', signup_get);

router.post('/signup', signup_post);

router.get('/login', login_get);

router.post('/login', login_post);

module.exports = router;