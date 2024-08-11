import express from "express";
import { getOrders } from "../controller/order.js";
import ensureAuthenticatedUser from "../middlewares/ensureAuthenticatedUser.js";
import { validateUserRole } from "../middlewares/ensureRole.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       required:
 *         - products
 *       properties:
 *         products:
 *           type: array
 *           items:
 *             type: string
 *             description: Product ID

 */

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get all orders
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: [] # Use the security scheme defined below
 *     responses:
 *       200:
 *         description: A list of orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   price:
 *                     type: number
 *                   description:
 *                     type: string
 *                   status:
 *                     type: string
 *                     enum: [CREATED]
 *                     default: CREATED
 *                   products:
 *                     type: array
 *                     items:
 *                       type: string
 *                       description: Product ID
 *                   user:
 *                     type: string
 *                     description: User ID
 */
router.get(
  "/",
  ensureAuthenticatedUser,
  validateUserRole(["ADMIN"]),
  getOrders
);

export default router;
