var router = require('express').Router();

router.use('/user', require('../app/controllers/userController')); 

router.use('/task', require('../app/controllers/taskController')); 

router.use('/publication', require('../app/controllers/publicationController')); 

router.use('/tag', require('../app/controllers/tagController')); 

router.use('/news', require('../app/controllers/newsController')); 

/* AUTHENTICATION */
router.use('/util', require('../app/controllers/utilController')); 

module.exports = router;