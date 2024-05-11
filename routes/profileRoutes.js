const express = require("express");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { getProfile, updateProfile, updateProfileDetails, uploadPhoto, setProfileVisibility, getProfileDetailsForAdmin,
    getPublicProfiles, getProfileDetailsForNormalUser } = require("../controllers/profileController");

const router = express.Router();

/**
 * @swagger
 * /api/profile:
 *   get:
 *     summary: Get user profile
 *     description: Retrieve the profile details of the currently authenticated user
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         description: Token obtained after successful login.
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Profile details retrieved successfully
 *       401:
 *         description: Unauthorized, user not authenticated
 *       500:
 *         description: Internal server error
 */
router.get("/", authMiddleware, getProfile);

/**
 * @swagger
 * /api/profile:
 *   put:
 *     summary: Update user profile
 *     description: Update the profile details of the currently authenticated user
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         description: Token obtained after successful login.
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       401:
 *         description: Unauthorized, user not authenticated
 *       500:
 *         description: Internal server error
 */
router.put("/", authMiddleware, updateProfile);

/**
 * @swagger
 * /api/profile/update-details:
 *   put:
 *     summary: Update user profile details
 *     description: Update specific details (name, bio, phone, email, etc.) of the currently authenticated user's profile
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         description: Token obtained after successful login.
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Profile details updated successfully
 *       401:
 *         description: Unauthorized, user not authenticated
 *       500:
 *         description: Internal server error
 */
router.put("/update-details", authMiddleware, updateProfileDetails);

/**
 * @swagger
 * /api/profile/upload-photo:
 *   post:
 *     summary: Upload photo or provide image URL
 *     description: Upload a new photo or provide an image URL for the currently authenticated user's profile
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         description: Token obtained after successful login.
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Profile details updated successfully
 *       401:
 *         description: Unauthorized, user not authenticated
 *       500:
 *         description: Internal server error
 */
router.post("/upload-photo", authMiddleware, uploadPhoto);

/**
 * @swagger
 * /api/profile/set-visibility:
 *   put:
 *     summary: Set profile visibility
 *     description: Set the profile visibility (public or private) for the currently authenticated user
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         description: Token obtained after successful login.
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Visibility updated successfully
 *       401:
 *         description: Unauthorized, user not authenticated
 *       500:
 *         description: Internal server error
 */
router.put("/set-visibility", authMiddleware, setProfileVisibility);

/**
 * @swagger
 * /api/profile/details-for-admin:
 *   get:
 *     summary: Get user profile details (for admin)
 *     description: Get all the user details(both public and private) for admin user
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         description: Token obtained after successful login.
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: All public and private user profiles retrieved successfully
 *       401:
 *         description: Unauthorized, user not authenticated
 *       500:
 *         description: Internal server error
 */
router.get("/details-for-admin", authMiddleware, getProfileDetailsForAdmin);

/**
 * @swagger
 * /api/profile/public-profiles:
 *   get:
 *     summary: Get user profile details (for normal user)
 *     description: Get all the public user details for admin user
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         description: Token obtained after successful login.
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: All public user profiles retrieved successfully
 *       401:
 *         description: Unauthorized, user not authenticated
 *       500:
 *         description: Internal server error
 */
router.get("/public-profiles", authMiddleware, getPublicProfiles);

// @route   GET /api/profile/details-for-normal-user
// @desc    Get user profile details (for normal user)
// @access  Private
router.get("/details-for-normal-user", authMiddleware, getProfileDetailsForNormalUser);



module.exports = router;
