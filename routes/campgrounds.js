const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campgrounds');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, validateCampground, isAuthor } = require('../middleware');

router.route('/').post(isLoggedIn, validateCampground, catchAsync(campgrounds.createCampground)).get(catchAsync(campgrounds.index));

// order does matter here.
router.get('/new', isLoggedIn, campgrounds.renderNewForm);

router.route('/:id').get(catchAsync(campgrounds.showCampground)).put(isLoggedIn, isAuthor, validateCampground, catchAsync(campgrounds.updateCampground)).delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));

module.exports = router;
