const express = require('express');

const {Router} = express;
const router = new Router();

const posts = require('./posts');

router.use('/', posts);

module.exports = router;
