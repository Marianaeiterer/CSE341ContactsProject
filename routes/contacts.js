const express = require('express');
const router = express.Router();

const contactsController = require("../controllers/contacts");

//get all the contacts
router.get("/", contactsController.getAll);

//get contact by ID
router.get("/:id", contactsController.getSingle);

//create new contact 
router.post("/", contactsController.createContact);

//update contact
router.put("/:id", contactsController.updateContact);

//delete contact
router.delete("/:id", contactsController.deleteContact);

module.exports = router;