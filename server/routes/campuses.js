'use strict';
const CampusRouter = require('express').Router();
const { Campus, Student } = require('../../db/models');

//GET - api/campuses
CampusRouter.get('/', (req, res, next) => {
  Campus.findAll({ where: req.query }) //if null find all
    .then(campuses => res.json(campuses))
    .catch(next);
});

//POST - api/campuses
CampusRouter.post('/', (req, res, next) => {
  Campus.findOrCreate({ where: req.body })
    .then(campus => res.json(campus))
    .catch(next);
});

//PARAM MIDDLEWARE - api/campuses/:campusId
CampusRouter.param('campusId', (req, res, next, id) => {
  Campus.findById(id)
    .then(campus => {
      if (!campus) {
        const err = Error('Campus not found');
        err.status = 404;
        throw err;
      }
      req.campus = campus;
      next();
    })
    .catch(next);
});

//GET - api/campuses/:campusId
CampusRouter.get('/:campusId', (req, res) => {
  res.json(req.campus);
});

//PUT - api/campuses/:campusId
CampusRouter.put('/:campusId', (req, res, next) => {
  req.campus.update(req.body)
    .then(campus => res.status(200).json(campus))
    .catch(next);
});

//DELETE - api/campuses/:campusId
CampusRouter.delete('/:campusId', (req, res, next) => {
  req.campus.destroy()
    .then(() => res.status(204).end())
    .catch(next);
});

module.exports = CampusRouter;

