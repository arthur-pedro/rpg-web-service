var router = require('express').Router();

router.use('/user', require('../app/controllers/userController')); 

router.use('/task', require('../app/controllers/taskController')); 

router.use('/publication', require('../app/controllers/publicationController')); 

router.use('/tag', require('../app/controllers/tagController')); 

router.use('/news', require('../app/controllers/newsController')); 

router.use('/event', require('../app/controllers/eventController')); 

router.use('/campus', require('../app/controllers/campusController')); 

router.use('/extension', require('../app/controllers/extensionProgramController')); 

/* AUTHENTICATION */
router.use('/util', require('../app/controllers/utilController')); 

module.exports = router;