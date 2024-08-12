import express from "express";
import { getOrderById, getOrders, getUserOrders } from "../controller/order.js";
import ensureAuthenticatedUser from "../middlewares/ensureAuthenticatedUser.js";
import { validateUserRole } from "../middlewares/ensureRole.js";

const router = express.Router();

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Retrieve all orders for the authenticated user
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: [] # Use the security scheme defined in your Swagger setup
 *     responses:
 *       200:
 *         description: Successfully retrieved a list of orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The unique identifier for the order
 *                   orderId:
 *                     type: string
 *                     description: The unique order ID
 *                   price:
 *                     type: number
 *                     description: The total price of the order
 *                   status:
 *                     type: string
 *                     description: The current status of the order
 *                   items:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         title:
 *                           type: string
 *                           description: The title of the item
 *                         imageUrl:
 *                           type: string
 *                           description: The URL of the item's image
 *                         amount:
 *                           type: number
 *                           description: The quantity of the item
 *                         id:
 *                           type: string
 *                           description: The unique identifier for the item
 *                         price:
 *                           type: number
 *                           description: The price of the item
 *                   user:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: The unique identifier for the user
 *                       name:
 *                         type: string
 *                         description: The name of the user
 *                       email:
 *                         type: string
 *                         description: The email of the user
 *       401:
 *         description: Unauthorized - Bearer token is missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Unauthorized
 *       404:
 *         description: No orders found for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Order not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */
router.get(
  "/",
  ensureAuthenticatedUser,
  validateUserRole(["ADMIN"]),
  getOrders
);

/**
 * @swagger
 * /api/orders/userOrders:
 *   get:
 *     summary: Retrieve the orders of the logged-in user.
 *     description: Fetches all orders associated with the authenticated user.
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved orders.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 orderId:
 *                   type: string
 *                 price:
 *                   type: number
 *                 status:
 *                   type: string
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                       imageUrl:
 *                         type: string
 *                       amount:
 *                         type: number
 *                       id:
 *                         type: number
 *                       price:
 *                         type: number
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *       404:
 *         description: No orders found for the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Order not found
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */
router.get("/userOrders", ensureAuthenticatedUser, getUserOrders);
/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Get an order by ID
 *     description: Retrieve a specific order by its ID, including the user's name and email.
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The order ID
 *     responses:
 *       200:
 *         description: Order found successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 orderId:
 *                   type: string
 *                 price:
 *                   type: number
 *                 status:
 *                   type: string
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                       imageUrl:
 *                         type: string
 *                       amount:
 *                         type: number
 *                       id:
 *                         type: number
 *                       price:
 *                         type: number
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *       404:
 *         description: Order not found
 *       500:
 *         description: Server error
 */

router.get("/:id", ensureAuthenticatedUser, getOrderById);

export default router;
