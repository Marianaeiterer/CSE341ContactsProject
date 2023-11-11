const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

//get all contacts
const getAll = async (req, res) => {
  //#swagger.tags=['Contacts']
  const result = await mongodb
    .getDatabase()
    .db('contacts_project') // database name
    .collection('contacts') //collection
    .find(); //find everything in this collection
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

//get one contact
const getSingle = async (req, res) => {
   //#swagger.tags=['Contacts']
  const contactId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDatabase()
    .db('contacts_project')
    .collection('contacts')
    .find({ _id: contactId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createContact = async (req, res) => {
   //#swagger.tags=['Contacts']
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
  };

  const response = await mongodb
    .getDatabase()
    .db('contacts_project')
    .collection('contacts')
    .insertOne(contact);
    if(response.acknowledged > 0){
      res.status(204).send();
    }else{
      res.status(500).json(response.error || 'Some error occurred while creating the user.');
    }

};

const updateContact = async (req, res) => {
   //#swagger.tags=['Contacts']
  const contactId = new ObjectId(req.params.id);
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
  };

  const response = await mongodb
    .getDatabase()
    .db('contacts_project')
    .collection('contacts')
    .replaceOne( { _id: contactId }, contact);
    if(response.modifiedCount > 0){
      res.status(204).send();
    }else{
      res.status(500).json(response.error || 'Some error occurred while updating the user.');
    }
};

const deleteContact = async (req, res) => {
   //#swagger.tags=['Contacts']
  const contactId = new ObjectId(req.params.id);
  const response = await mongodb
  .getDatabase()
  .db('contacts_project')
  .collection('contacts')
  .deleteOne( { _id: contactId }, true);
  if(response.deletedCount > 0){
    res.status(204).send();
  }else{
    res.status(500).json(response.error || 'Some error occurred while deleting the user.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact,
};
