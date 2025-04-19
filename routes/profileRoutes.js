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

/**
 * @swagger
 * /api/v1/profile/me:
 *   get:
 *     summary: Get current user profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/UserSchemas'
 *       401:
 *         description: Unauthorized
 */
router.route('/me').get(protect, getMyProfile);

router.route('/').put(protect, updateProfile);
router.route('/education').put(protect, addEducation);
router.route('/education/:edu_id').delete(protect, deleteEducation);
router.route('/photo').put(protect, uploadProfilePhoto);
router.route('/photo').delete(protect, deleteProfilePhoto);

module.exports = router;