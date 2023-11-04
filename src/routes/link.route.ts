import express from "express";
import LinkController from "../controllers/link.controller";
import { validateSchema, validateQuery } from "../middleware/validator";
import { queryDtoSchema, linkDto, UpdateDto } from "../validators";
const router = express.Router();

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
router.post("/", validateSchema(linkDto), LinkController.create);

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
router.get("/", validateQuery(queryDtoSchema), LinkController.find);

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
router.get("/:id", LinkController.findOne);

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
router.put("/:id", validateSchema(UpdateDto), LinkController.UpdatedOne);

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
router.delete("/:id", LinkController.deleteOne);

export default router;
