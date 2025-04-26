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

/**
 * @swagger
* /api/v1/profile/:
*   put:
*     summary: Update User Education Info.
*     tags: [Profile]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/UserProfileUpdate'
*     responses:
*       200:
*         description: Successful Updated
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/UserSchemas'
*                       
*       401:
*          description: Unauthorize!
*          content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/ErrorResponse'
*/
router.route('/').put(protect, updateProfile);

/**
 * @swagger
* /api/v1/profile/education:
*   put:
*     summary: Update User Education Info.
*     tags: [Profile]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/UserEducation'
*     responses:
*       200:
*         description: Successful Updated
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/UserProfile'
*                       
*       401:
*          description: Unauthorize!
*          content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/ErrorResponse'
*/
router.route('/education').put(protect, addEducation);

router.route('/education/:edu_id').delete(protect, deleteEducation);

/**
 * @swagger
* /api/v1/profile/photo:
*   put:
*     summary: Update User photo.
*     tags: [Profile]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/UserProfilePhoto'
*     responses:
*       200:
*         description: Successful Uploaded
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/UserProfile'
*                       
*       401:
*          description: Unauthorize!
*          content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/ErrorResponse'
*/
router.route('/photo').put(protect, uploadProfilePhoto);

router.route('/photo').delete(protect, deleteProfilePhoto);

module.exports = router;