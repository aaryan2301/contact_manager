const express= require("express");
const router= express.Router();
const {getContacts, createContact, getContact, updateContact, deleteContact}= require("../controllers/contactController");
const validateToken = require("../middleware/validateTokenHandler");

/**
 * @swagger
 * components:
 *   schemas:
 *     Contact:
 *       type: object
 *       required:
 *         - user_id
 *         - name
 *         - email
 *         - phone
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the contact
 *         user_id:
 *           type: string
 *           description: The id of the user who owns this contact
 *         name:
 *           type: string
 *           description: The contact's name
 *         email:
 *           type: string
 *           description: The contact's email address
 *         phone:
 *           type: string
 *           description: The contact's phone number
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the contact was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date the contact was last updated
 *       example:
 *         id: 64d3e7b5f9c79b00123a7890
 *         user_id: 64d3e7b5f9c79b00123a4567
 *         name: Jane Doe
 *         email: jane.doe@example.com
 *         phone: "+1234567890"
 *         createdAt: 2025-01-01T11:00:00.000Z
 *         updatedAt: 2025-01-02T13:00:00.000Z
 */

/**
 * @swagger
 * tags:
 *   name: Contacts
 *   description: API for managing contacts
 */

/**
 * @swagger
 * /api/contacts:
 *   get:
 *     summary: Get all contacts of the logged-in user
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all contacts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Contact'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 *   post:
 *     summary: Create a new contact
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *             required:
 *               - name
 *               - email
 *               - phone
 *     responses:
 *       201:
 *         description: Contact created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       400:
 *         description: Missing required fields
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/contacts/{id}:
 *   get:
 *     summary: Get a single contact by ID
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The contact ID
 *     responses:
 *       200:
 *         description: The contact data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       404:
 *         description: Contact not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 *   put:
 *     summary: Update a contact by ID
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The contact ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contact updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       403:
 *         description: User does not have permission to update the contact
 *       404:
 *         description: Contact not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 *   delete:
 *     summary: Delete a contact by ID
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The contact ID
 *     responses:
 *       200:
 *         description: Contact deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       403:
 *         description: User does not have permission to delete the contact
 *       404:
 *         description: Contact not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

router.use(validateToken);
router.route("/").get(getContacts);
router.route("/:id").get(getContact);
router.route("/").post(createContact);
router.route("/:id").put(updateContact);
router.route("/:id").delete(deleteContact);

module.exports= router;