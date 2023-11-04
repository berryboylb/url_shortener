"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const link_controller_1 = __importDefault(require("../controllers/link.controller"));
const validator_1 = require("../middleware/validator");
const validators_1 = require("../validators");
const router = express_1.default.Router();
/**
 * @swagger
 * /api/v1/links:
 *   post:
 *     summary: Shorten Link
 *     description: This shortens a link
 *     tags: [Link]
 *     parameters:
 *       - in: body
 *         name: Link details
 *         description: The data for the Link details to be created.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             originalUrl:
 *               type: string
 *
 *     responses:
 *       201:
 *         description: Successfully shortened the link
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       500:
 *         description: Failed to Successfully shortened the link
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 successful:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "invalid input syntax for type integer: \"\""
 *                 data:
 *                   type: null
 */
router.post("/", (0, validator_1.validateSchema)(validators_1.linkDto), link_controller_1.default.create);
/**
 * @swagger
 * /api/v1/links:
 *   get:
 *     summary: Get All link.
 *     description: this get's all the link.
 *     tags: [Link]
 *     parameters:
 *       - in: query
 *         name: page
 *         type: string
 *         description: Optional page parameter
 *     responses:
 *       200:
 *         section: success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     successful:
 *                       type: boolean
 *                     message:
 *                       type: string
 *       500:
 *         description: Failed to fetch links.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 successful:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "invalid input syntax for type integer: \"\""
 *                 data:
 *                   type: null
 */
router.get("/", (0, validator_1.validateQuery)(validators_1.queryDtoSchema), link_controller_1.default.find);
/**
 * @swagger
 * /api/v1/links/{id}:
 *   get:
 *     summary: Get A single link.
 *     description: Gets all links
 *     tags: [Link]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the record
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully found the link.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description:  link detail not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.get("/:id", link_controller_1.default.findOne);
/**
 * @swagger
 * /api/v1/links/{id}:
 *   put:
 *     summary: Update Link by id.
 *     description: Update link by id.
 *     tags: [Link]
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         description: required id param
 *       - in: body
 *         name: Link details
 *         description: the data for the Link details to be updated.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             originalUrl:
 *               type: string
 *     responses:
 *       200:
 *         section: Link not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 successful:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     successful:
 *                       type: boolean
 *                     message:
 *                       type: string
 *       500:
 *         description: Failed to fetch Link.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 successful:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "invalid input syntax for type integer: \"\""
 *                 data:
 *                   type: null
 */
router.put("/:id", (0, validator_1.validateSchema)(validators_1.UpdateDto), link_controller_1.default.UpdatedOne);
/**
 * @swagger
 * /api/v1/links/{id}:
 *   delete:
 *     summary: Delete Link by id.
 *     description: Delete link by id.
 *     tags: [Link]
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         description: required id param
 *     responses:
 *       200:
 *         section: Link not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 successful:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     successful:
 *                       type: boolean
 *                     message:
 *                       type: string
 *       500:
 *         description: Failed to fetch Link.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 successful:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "invalid input syntax for type integer: \"\""
 *                 data:
 *                   type: null
 */
router.delete("/:id", link_controller_1.default.deleteOne);
exports.default = router;
