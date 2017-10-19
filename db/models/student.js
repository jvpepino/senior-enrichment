const db = require('../_db');
const Sequelize = require('sequelize');
// const Campus = require('./campus');
//console.log("Importing Campus in Student", Campus);

const Student = db.define('student', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  }
},
{
  defaultScope: {
    include: [ { all: true } ]
  }
}
);

module.exports = Student; // we have the value of Student, and we keep executing

//const Campus = require('./campus'); // node already has the value of this singleton, so it should just give it to this variable

// Student.addScope('defaultScope', { include: [ {all: true} ] }, {override: true})
