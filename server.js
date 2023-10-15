const express = require("express");
const app = express();
const connect = require('./helpers/dbconnect');
const path = require('path');
const Person = require("./models/person");
require('dotenv').config();
connect();


// Create a new person
app.post("/person", (req, res) => {
  const newPerson = new Person({
    name: 'Ons',
    age: 29,
    favoriteFoods: ['Pizza', 'Burger']
  });

  newPerson.save()
    .then(data => {
      console.log('Person saved successfully:', data);
      res.json(data); 
    })
    .catch(err => {
      console.error('Error saving person:', err);
      res.status(500).json({ error: 'Error saving person' }); 
    });
});

// Retrieve all person with the name "Ons"
app.get("/person", (req, res) => {
  Person.find({ name: 'Ons' })
    .then(person => {
      res.json(person);
    })
    .catch(err => {
      console.error('Error finding person:', err);
      res.status(500).json({ error: 'Error finding person' }); 
    });
});


app.put("/person/:id", (req, res) => {
  const personId = req.params.id;
  const newAge = 35; 

  Person.findByIdAndUpdate(personId, { age: newAge }, { new: true })
    .then(updatedPerson => {
      if (updatedPerson) {
        console.log('Updated person:', updatedPerson);
        res.json(updatedPerson); 
      } else {
        res.status(404).json({ error: 'Person not found' }); 
      }
    })
    .catch(err => {
      console.error('Error updating person:', err);
      res.status(500).json({ error: 'Error updating person' }); 
    });
});

// Delete a person by ID
app.delete("/person/:id", (req, res) => {
  const personIdToDelete = req.params.id;

  Person.findByIdAndRemove(personIdToDelete)
    .then(deletedPerson => {
      if (deletedPerson) {
        console.log('Deleted person by ID:', deletedPerson);
        res.json({ message: 'Person deleted successfully' }); 
      } else {
        res.status(404).json({ error: 'Person not found' }); 
      }
    })
    .catch(err => {
      console.error('Error deleting person by ID:', err);
      res.status(500).json({ error: 'Error deleting person' }); 
    });
});



app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`));
