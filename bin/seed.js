// This file should contain all the record creation needed to seed the database with its default values.
// The data can then be loaded with the node seed.js

const Promise = require("bluebird");
const {
  Campus,
  Student,
  db
} = require('../db/models');

const data = {
  student: [
    {
      name: "John Pepino",
      campus: {
        name: "Lehigh",
        image: 'https://www.rif.org/sites/default/files/200x200-ReadingActivities.png'
      },
      email: "jpepino@mail.com"
    },
    {
      name: "Tom Motto",
      campus: {
        name: "Villanova",
        image: 'https://www.rif.org/sites/default/files/200x200-ReadingActivities.png'
      },
      email: "tmotto@mail.com"
    },
    {
      name: "Chris Motto",
      campus: {
        name: "Rowan",
        image: 'https://www.rif.org/sites/default/files/200x200-ReadingActivities.png'
      },
      email: "cmotto@mail.com"
    },
    {
      name: "Dana Pepino",
      campus: {
        name: "GCU",
        image: 'https://www.rif.org/sites/default/files/200x200-ReadingActivities.png'
      },
      email: "dpepeino@mail.com"
    },
    {
      name: "Anthony Dalessio",
      campus: {
        name: "Stockton",
        image: 'https://www.rif.org/sites/default/files/200x200-ReadingActivities.png'
      },
      email: "adalessio@mail.com"
    },
    {
      name: "Mark Zuckerberg",
      campus: {
        name: "Harvard",
        image: 'https://www.rif.org/sites/default/files/200x200-ReadingActivities.png'
      },
      email: "mzuckerberg@mail.com"
    },
    {
      name: "Wayne Gretzky",
      campus: {
        name: "NHL",
        image: 'https://www.rif.org/sites/default/files/200x200-ReadingActivities.png'
      },
      email: "wgretzky@mail.com"
    },
    {
      name: "John Doe",
      campus: {
        name: "MIT",
        image: 'https://www.rif.org/sites/default/files/200x200-ReadingActivities.png'
      },
      email: "johndoe@mail.com"
    },
    {
      name: "Jane Doe",
      campus: {
        name: "Stanford",
        image: 'https://www.rif.org/sites/default/files/200x200-ReadingActivities.png'
      },
      email: "janedoe@mail.com"
    },
    {
      name: "Michael Jordan",
      campus: {
        name: "UNC",
        image: 'https://www.rif.org/sites/default/files/200x200-ReadingActivities.png'
      },
      email: "goat@mail.com"
    },
    {
      name: "Tony Bascone",
      campus: {
        name: "NYU",
        image: 'https://www.rif.org/sites/default/files/200x200-ReadingActivities.png'
      },
      email: "abascone@mail.com"
    }
  ]
};

db
  .sync({ force: true })
  .then(function() {
    console.log("Dropped old data, now inserting data");
    return Promise.map(Object.keys(data), function(name) {
      return Promise.map(data[name], function(item) {
        return db.model(name).create(item, {
          include: [Campus]
        });
      });
    });
  })
  .then(function() {
    console.log("Finished inserting data");
  })
  .catch(function(err) {
    console.error("There was totally a problem", err, err.stack);
  })
  .finally(function() {
    db.close(); // uses promises but does not return a promise. https://github.com/sequelize/sequelize/pull/5776
    console.log("connection closed"); // the connection eventually closes, we just manually do so to end the process quickly
    return null; // silences bluebird warning about using non-returned promises inside of handlers.
  });
