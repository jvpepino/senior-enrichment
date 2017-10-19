const db = require('../_db');
const Sequelize = require('sequelize');

const images = [
  'https://www.rif.org/sites/default/files/200x200-ReadingActivities.png'
];

const getRandomImage = () => images[Math.floor(Math.random() * images.length)];

const Campus = db.define('campus', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  image: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: function () {
      return getRandomImage();
    }
  }
});

module.exports = Campus; // this file is a singleton and the value is set

//const Student = require('./student');

