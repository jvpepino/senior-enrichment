'use strict';
const StudentRouter = require('express').Router();
const { Student, Campus } = require('../../db/models');

//GET - api/students
StudentRouter.get('/', (req, res, next) => {
  Student.findAll({ where: req.query })
    .then(students => res.json(students))
    .catch(next);
});

//POST - api/students
StudentRouter.post('/', (req, res, next) => {
  Student.findOrCreate({ where: req.body })
    .then(([student, bool]) => {
      return student.reload()
      .then(() => res.json({student, bool}));
      // return Student.findById(student.id);
    })
    .catch(next);
});

//PARAM MIDDLEWARE - api/students/:studentId
StudentRouter.param('studentId', (req, res, next, id) => {
  Student.findById(id)
    .then(student => {
      if (!student) {
        const err = Error('Student not found');
        err.status = 404;
        throw err;
      }
      req.student = student;
      next();
    })
    .catch(next);
});

//GET - api/students/:studentId
StudentRouter.get('/:studentId', (req, res) => {
  res.json(req.student);
});

//PUT - api/students/:studentId
StudentRouter.put('/:studentId', (req, res, next) => {
  req.student.update(req.body)
    .then(student => student.reload())
    .then(student => res.status(200).json(student))
    .catch(next);
});

//DELETE - api/students/:studentId
StudentRouter.delete('/:studentId', (req, res, next) => {
  req.student.destroy()
    .then(() => res.status(204).end())
    .catch(next);
});

module.exports = StudentRouter;

