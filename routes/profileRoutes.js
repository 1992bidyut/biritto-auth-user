const express = require('express');
const {
  getMyProfile,
  updateProfile,
  addEducation,
  deleteEducation,
  uploadProfilePhoto,
  deleteProfilePhoto
} = require('../controllers/profileController');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.route('/me').get(protect, getMyProfile);
router.route('/').put(protect, updateProfile);
router.route('/education').put(protect, addEducation);
router.route('/education/:edu_id').delete(protect, deleteEducation);
router.route('/photo').put(protect, uploadProfilePhoto);
router.route('/photo').delete(protect, deleteProfilePhoto);

module.exports = router;