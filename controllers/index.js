const router = require('express').Router();

const apiRoutes = require('./api');
// const homeRoutes = require('./home-routes');
const baseRoutes = require('./base-routes');

// router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('*', baseRoutes);

module.exports = router;
