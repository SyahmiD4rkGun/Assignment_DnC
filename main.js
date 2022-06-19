const MongoClient = require("mongodb").MongoClient;
const User = require("./user");

MongoClient.connect(
	// TODO: Connection 
	"mongodb+srv://m001-student:m001-mongodb-basics@sandbox.98hil.mongodb.net/m201 people.json",
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
			title: 'Blood Banking System',
			version: '1.0.0',
		},
	},
	apis: ['./main.js'], // files containing annotations as above
};

const jwt = require('jsonwebtoken');
 function generateAccessToken(payload) {
	 return jwt.sign(payload, "my-super-secret", { expiresIn: '60s' });
 }

function verifyToken(req, res, next) {
	const authHeader = req.headers['authorization']
	const token = authHeader && authHeader.split(' ')[1]

	if (token == null) return res.sendStatus(401)

	jwt.verify(token, "Assignment-G2", (err, user) => {
		console.log(err)

		if (err) return res.sendStatus(403)

		req.user = user
		req.id = user.id

		next()
	})
}

const swaggerSpec = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json())
app.use(express.urlencoded({ extended: false }))






app.get('/check/:id', async (req, res) => {
	const user = await User.check(req.params.id,req.body.name, req.body.password,req.body.Email,req.body.details)
	if(user== false){
		res.status(401).json(
			{
				status: "error",
				message: "not found"
			}
		)
	}else{
		res.status(200).json(user);
	}
})

app.post('/login', async (req, res) => {
	console.log(req.body);


	const user = await User.login(req.body.id,req.body.name, req.body.password,req.body.Email,req.body.details);
	if(!user){
		res.status(401).json(
			{
				status: "error",
				message: "Login Invalid"
			}
		)
	}else{
		res.status(200).json(user);
	}
	

	
})

app.post('/register', async (req, res) => {
	//console.log(req.body);
	const user = await User.register(req.body.id,req.body.name, req.body.password,req.body.Email,req.body.details);
	if(!user){
		res.status(401).json(
			{
				status: "error",
				message: "Register Invalid"
			}
		)
	}else{
		res.status(200).json(user);
	}

})
//app.use(verifyToken);

app.patch('/update/:id', async (req,res) => {
	const user = await User.update(req.params.id,req.body.name, req.body.password,req.body.Email,req.body.details)
	res.json(user)
})

app.delete('/delete/:id', async (req,res) => {
	const user = await User.delete(req.params.id,req.body.name, req.body.password,req.body.Email,req.body.details)
	res.json(user)
})

 

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})
/**
 * components:
 *   schemas:
 *     user:
 *       type: object
 *         properties:
 *           id: 
 *             type: integer
 *           name: 
 *             type: string
 *           Email:
 *             type: string
 *           password: 
 *             type: string
 *           schema: 
 *             $ref : "#/components/schemas/details"
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     details:
 *       type: array
 *       items:
 *         type: object
 *         properties:
 *           Age:
 *             type: string
 *           Blood_Type:
 *             type: string
 *        
 */
/**
 * @swagger
 * /register:
 *   post:
 *     description: Register
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             type: object
 *             properties:
 *               id: 
 *                 type: string
 *               name: 
 *                 type: string
 *               Email:
 *                 type: string
 *               password: 
 *                 type: string
 *               details: 
 *                 $ref : "#/components/schemas/details"
 *     responses:
 *       200:
 *         description: Successful login
 *       401:
 *         description: Invalid username or password
 */
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
 *               id: 
 *                 type: string
 *               password: 
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful login
 *       401:
 *         description: Invalid username or password
 */
/**
 * @swagger
 * /check/{idno}:
 *   get:
 *     description: Returns Array of the User
 *     parameters:
 *       - in: path
 *         name: idno
 *         required: true
 *         content:
 *           application/json:
 *             schemas:
 *               type: object
 *               id:
 *                 type: string
 *        
 *     responses:
 *       200:
 *         description: Search Found!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id: 
 *                   type: string
 *                 name: 
 *                   type: string
 *                 Email:
 *                   type: string
 *                 password: 
 *                   type: string
 *                 schema: 
 *                   $ref : "#/components/schemas/details"
 */
/**
 * @swagger
 * /update/{idno}:
 *   patch:
 *     description: Update info of users
 *     parameters:
 *       - in: path
 *         name: idno
 *         required: true
 *         content:
 *           application/json:
 *             schemas:
 *               type: object
 *               id:
 *                 type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             type: object
 *             properties:
 *               id: 
 *                 type: string
 *               name: 
 *                 type: string
 *               Email:
 *                 type: string
 *               password: 
 *                 type: string
 *               details: 
 *                 $ref : "#/components/schemas/details"
 *     responses:
 *       200:
 *         description: Search Found!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id: 
 *                   type: string
 *                 name: 
 *                   type: string
 *                 Email:
 *                   type: string
 *                 password: 
 *                   type: string
 *                 schema: 
 *                   $ref : "#/components/schemas/details"
 */

/**
 * @swagger
 * /delete/{idno}:
 *   delete:
 *     description: Returns Array of the User
 *     parameters:
 *       - in: path
 *         name: idno
 *         required: true
 *         content:
 *           application/json:
 *             schemas:
 *               type: object
 *               id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Search Found!
 *     
 */


