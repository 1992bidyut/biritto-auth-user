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
 *     summary: Get current authenticated user's profile
 *     description: Returns the profile of the currently logged-in user
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *             example:
 *               success: true
 *               data:
 *                 id: "65a8f27c1e4e8a0012e5f7d2"
 *                 name: "John Doe"
 *                 email: "john@example.com"
 *                 role: "user"
 *                 profile:
 *                   bio: "Full stack developer"
 *                   website: "https://johndoe.com"
 *                   location: "San Francisco, CA"
 *                   profilePhoto: "photo_123.jpg"
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: "Not authorized to access this route"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: "Server Error"
 */
router.route('/me').get(protect, getMyProfile);
router.route('/').put(protect, updateProfile);
router.route('/education').put(protect, addEducation);
router.route('/education/:edu_id').delete(protect, deleteEducation);
router.route('/photo').put(protect, uploadProfilePhoto);
router.route('/photo').delete(protect, deleteProfilePhoto);

module.exports = router;