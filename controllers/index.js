const router = require('express').Router();

const baseRoutes = require('./base-routes');
const apiRoutes = require('./api');
const dashboardRoutes = require('./dashboard-routes');
const registerRoutes = require('./register-routes');

router.use('/register', registerRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/api', apiRoutes);
router.use('*', baseRoutes);

module.exports = router;
