const express = require('express');
const application = express();
const mongoose = require('mongoose');
const port = 4445;
const dbName = 'mongodb://127.0.0.1:27017/mern_lib';

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const catalogRouter = require('./routes/catalog');

application.use(express.json());

mongoose
  .connect(dbName)
  .then(() => {
    console.log(`Connection with DB ${dbName} set up`);
  })
  .catch(() => {
    console.log(`Failed set up connection with DB ${dbName}`);
  });

// Switch on Routers
application.use('/', indexRouter);
application.use('/users', usersRouter);
application.use('/catalog', catalogRouter);

application.listen(port, (error) => {
  if (error) {
    return console.log('Error while launching Web Server', error);
  }
  console.log(`Web server is listening at port ${port}`);
});
