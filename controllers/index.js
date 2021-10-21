const router = require('express').Router();

const apiRoutes = require('./api');
const dashboardRoutes = require('./dashboard-routes');
const baseRoutes = require('./base-routes');

router.use('/dashboard', dashboardRoutes);
router.use('/api', apiRoutes);
router.use('*', baseRoutes);

module.exports = router;
