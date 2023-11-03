const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;



const getAll = async (req, res) => {  //get all contacts 
    const result = await mongodb
      .getDatabase()
      .db("contacts_project")  // database name
      .collection("contacts")  //collection
      .find();  //find everything in this collection
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists);      
    });
};

const getSingle = async (req, res) => {   //get one contact
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .db("contacts_project")
      .collection("contacts")
      .find({ _id: userId });
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists[0]);
    });
  };

module.exports = {
    getAll,
    getSingle
}