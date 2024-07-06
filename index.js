const express = require('express');
const application = express();
const mongoose = require('mongoose');
const port = 4445;
const dbName = 'mongodb://127.0.0.1:27017/mern_lib';
const Genre = require('./models/genre');
const Author = require('./models/author');

application.use(express.json());

mongoose
  .connect(dbName)
  .then(() => {
    console.log(`Connection with DB ${dbName} set up`);
  })
  .catch(() => {
    console.log(`Failed set up connection with DB ${dbName}`);
  });

application.get('/', (req, res) => {
  res.send('Server response !');
});

application.post('/genre', async (req, res) => {
  try {
    const doc = new Genre({ name: req.body.name });
    const genre = await doc.save();
    res.json(genre);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to create new Genre' });
  }
});

application.post('/author', async (req, res) => {
  try {
    const params = {
      firstName: req.body.firstName,
      familyName: req.body.familyName,
      birthDate: req.body.birthDate,
      deathDate: req.body.deathDate,
    };
    const doc = new Author(params);
    const author = await doc.save();
    res.json(author);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to create new Author' });
  }
});

application.listen(port, (error) => {
  if (error) {
    return console.log('Error while launching Web Server', error);
  }
  console.log(`Web server is listening at port ${port}`);
});
