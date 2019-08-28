var router = require('express').Router();

router.use('/user', require('../app/controllers/userController')); 

router.use('/task', require('../app/controllers/taskController')); 

router.use('/publication', require('../app/controllers/publicationController')); 

/* AUTHENTICATION */
router.use('/auth', require('../app/controllers/utilController')); 

module.exports = router;