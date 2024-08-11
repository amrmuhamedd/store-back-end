import express from "express";
import { handleWebhook } from "../controller/webhook.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: webhook
 *     description: to recieve payment webhook from kashier
 */

/**
 * @swagger
 * /api/webhook/kashier-webhook:
 *   post:
 *     summary: recieve webhook from kashier
 *     tags:
 *       - webhook
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       '200':
 *         description: recieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: recieved successfuly
 */
router.post("/kashier-webhook", handleWebhook);

export default router;
