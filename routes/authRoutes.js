const express = require('express');
const {
  register,
  login,
  logout,
  getMe,
  forgotPassword,
  resetPassword
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User authentication
 */

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 6
 *             example:
 *               name: John Doe
 *               email: john@example.com
 *               password: password123
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request - validation error
 */
router.post('/register', register);
/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *             example:
 *               email: john@example.com
 *               password: password123
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', login);
router.get('/logout', logout);

/**
 * @swagger
 * /api/v1/auth/me:
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

router.get('/me', protect, getMe);
router.post('/forgotpassword', forgotPassword);
router.patch('/resetpassword/:token', resetPassword);

module.exports = router;