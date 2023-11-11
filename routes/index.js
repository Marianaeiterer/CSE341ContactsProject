const router = require('express').Router(); //allow us to handle routes

router.use('/', require('./swagger'));

router.use("/contacts", require('./contacts'));


module.exports = router;