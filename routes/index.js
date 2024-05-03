var express = require('express');
var router = express.Router();
var eventHandler = require('../controller/eventHandler');
var queryHandler = require('../controller/queryHandler');

/* GET home page. */
router.get('/', async (req, res, next) => {
  res.render('index', { title: 'Portal26 API Services' });
});

router.get('/v1/*', async (req, res, next) => {
  next(new Error('Operation not supported'))
});

// query requests
router.post('/v1/:tenant/query/', queryHandler);

// events requests
router.post('/v1/webhooks/:tenant/events/new', eventHandler);

module.exports = router;

