const router = require('express').Router(); //allow us to handle routes

router.get('/', (req, res) => {
    res.send('Hello World');
});

module.exports = router;