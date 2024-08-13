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
 *     summary: receive webhook from kashier
 *     tags:
 *       - webhook
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       '200':
 *         description: received
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: received successfully
 */

router.post("/kashier-webhook", handleWebhook);

export default router;
