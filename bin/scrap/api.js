'use strict';
const api = require('express').Router();
const { db } = require('../db/models');

// If you aren't getting to this object, but rather the index.html (something with a joke) your path is wrong.
	// I know this because we automatically send index.html for all requests that don't make sense in our backend.
	// Ideally you would have something to handle this, so if you have time try that out!
api.get('/hello', (req, res) => res.send({hello: 'world'}));

api.get('/student', (req, res) => res.send({hello: 'world'}) );

api.post('/student', (req, res) => res.send({hello: 'world'}) );

api.get('/student/:studentId', (req, res) => res.send({hello: 'world'}));

api.get('/campus', (req, res) => res.send({hello: 'world'}));

api.get('/campus/:campusId', (req, res) => res.send({hello: 'world'}));

module.exports = api;
