const MongoClient = require("mongodb").MongoClient;
const User = require("./user");

MongoClient.connect(
	// TODO: Connection 
	"mongodb+srv://m001-student:m001-mongodb-basics@sandbox.98hil.mongodb.net/?retryWrites=true&w=majority",
	{ useNewUrlParser: true },
).catch(err => {
	console.error(err.stack)
	process.exit(1)
}).then(async client => {
	console.log('Connected to MongoDB');
	User.injectDB(client);
})

const express = require('express');
const res = require("express/lib/response");
const app = express()
const port = process.env.PORT || 5000

const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Blood Banking Sytem',
			version: '1.0.0',
		},
	},
	apis: ['./main.js'], // files containing annotations as above
};

const swaggerSpec = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.get('/', (req, res) => {
	res.send('Hello World')
})

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - author
 *       properties:
 *         name:
 *           type: string
 *           description: The auto-generated id of the book
 *         title:
 *           type: string
 *           description: The book title
 *         author:
 *           type: string
 *           description: The book author
 *       example:
 *         id: d5fE_asz
 *         title: The New Turing Omnibus
 *         author: Alexander K. Dewdney
 */


/**
 * @swagger
 * /check/{name}:
 *  get:
 *      description: Check User
 *      tags: [users]
 *      parameters:
 *          -in : path
 *          name: name
 *          schema:
 *            type: string
 *          required : true
 *          description: The User name
 *      responses:
 *          200:
 *              description: The user description by name
 *              contents:
 *                 application/json:
 *                      schema:
 *                          $ref: '#components/schemas/users'
 *          400:
 *              description: user not found
 * 
 */
app.get('/check', async (req, res) => {
	const user = await User.check(req.body.name,req.body.password)
	res.json(user)
})
/**
 * @swagger
 * /login:
 *   post:
 *     description: User Login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             type: object
 *             properties:
 *               username: 
 *                 type: string
 *               password: 
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Invalid username or password
 */
app.post('/login', async (req, res) => {
	console.log(req.body);


	const user = await User.login(req.body.name, req.body.password);
	res.json(user)
	// res.json({
	// _id: '123456',
	// name: 'test',
	// 	age: 18
	// })
})

app.post('/register', async (req, res) => {
	//console.log(req.body);
	const user = await User.register(req.body.name, req.body.password);
	res.json(user)

	// res.json({
	// 	_id: '123456',
	// 	name: 'test',
	// 	age: 18,
	// })
})

app.patch('/update', async (req,res) => {
	const user = await User.update(req.body.name,req.body.password)
	res.json(user)
})

app.delete('/delete', async (req,res) => {
	const user = await User.delete(req.body.name,req.body.password)
	res.json(user)
})

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})
