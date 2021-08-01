import { Router, Request, Response } from "express";
import UserController from "../users/user.controller";
import AuthController from "../auth/auth.controller";
import AddressController from "../address/address.controller";
import auth from "../middleware/verifyToken";

const app = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the user
 *         email:
 *           type: string
 *           unique: true
 *           description: The user's email
 *         password:
 *           type: string
 *           description: The user password
 *       example:
 *         name: John
 *         email: john@doe.com
 *         password: aaaaaa
 *     UserSuccess:
 *        type: object
 *        properties:
 *          msg:
 *            type: string
 *            description: User created
 *          data:
 *            type: object
 *            properties:
 *              id:
 *                type: string
 *              name:
 *                type: string
 *            example:
 *              id: 610653e5c15541fce3968923
 *              name: John
 *     AddressInput:
 *        type: object
 *        required:
 *          - street
 *          - streetNumber
 *          - town
 *          - postalCode
 *          - country
 *        properties:
 *          street:
 *            type: string
 *            description: Comma seperated street names
 *          streetNumber:
 *            type: number
 *          town:
 *            type: string
 *            description: town or city or county
 *          postalCode:
 *            type: string
 *          country:
 *            type: string
 *     weather:
 *        type: object
 *        properties:
 *          product:
 *            type: string
 *          init:
 *            type: string
 *          dataseries:
 *            - properties:
 *                date:
 *                  type: number
 *                weather:
 *                  type: string
 *
 *
 *   securitySchemes:
 *        bearerAuth:
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT
 * security:
 *  - bearerAuth: []
 *
 */

/**
 * @openapi
 * /api/v1:
 *   get:
 *     tags: [BASE_API]
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns Welcome to Weather Api!.
 */
app.get("/", (req: Request, res: Response) => {
  res.json("Welcome to Weather Api!");
});

/**
 * @swagger
 * /api/v1/auth/login:
 *  post:
 *    tags:
 *    - "auth"
 *    description: User login
 *    responses:
 *      '200':
 *        description: A successful response
 */
app.post("/auth/login", AuthController.userLogin);

/**
 * @swagger
 * /api/v1/users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserSuccess'
 *       400:
 *         description: Invalid email address | User with email already exist
 */
app.post("/users", UserController.createUser);

/**
 * @swagger
 * /api/v1/addresses/verify:
 *   post:
 *     summary: Verify address
 *     tags: [Addresses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddressInput'
 *     responses:
 *       200:
 *         description: Retrieve array of address objects or returns empty array
 */
app.post("/addresses/verify", AddressController.getAddress);

//secured routes
/**
 * @swagger
 * /api/v1/addresses/weather:
 *   post:
 *     security:
 *      - bearerAuth: []
 *     summary: Get weather forcasts for a given address
 *     tags: [Addresses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddressInput'
 *     responses:
 *       200:
 *         description: Retrieve array of address objects or returns empty array
 *         content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/weather'
 *
 */
app.use(auth);
app.post("/addresses/weather", AddressController.checkWeather);

export default app;
