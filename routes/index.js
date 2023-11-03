const router = require('express').Router(); //allow us to handle routes
const contactsController = require("../controllers/contact");

router.get("/contacts", contactsController.getAll);

router.get("/contacts/:id", contactsController.getSingle);

module.exports = router;