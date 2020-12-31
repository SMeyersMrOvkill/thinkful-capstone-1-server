const express = require('express');
const GenresService = require('./genres-service');
const { requireAuth } = require('../middleware/jwt-auth')

const genresRouter = express.Router();

genresRouter.route('/')
    .all(requireAuth)
    .get((req, res, next) => {
        GenresService.getAllGenresForUser(req.app.get('db'), req.user.id).then(data => {
            return res.json(data);
        });
    })

module.exports = genresRouter;