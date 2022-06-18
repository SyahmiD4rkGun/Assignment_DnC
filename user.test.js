const MongoClient = require("mongodb").MongoClient;
const User = require("./user")

describe("Blood Bank System", () => {
	let client;
	beforeAll(async () => {
		client = await MongoClient.connect(
			"mongodb+srv://m001-student:m001-mongodb-basics@sandbox.98hil.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
			{ useNewUrlParser: true },
		);
		User.injectDB(client);
	})

	afterAll(async () => {
		await client.close();
	})

	test("New user registration", async () => {
		const res = await User.register("test", "1234","syahmij")
		expect(res.acknowledged).toBe(true)
	})

	test("Duplicate username", async () => {
		const res = await User.register("test", "1234","syahmij")
		expect(res.acknowledged).toBe(true)
	})

	test("User login invalid username", async () => {
		const res = await User.login("test", "1234","syahmij")
		expect(res.name).toBe("test")
	})

	test("User login invalid password", async () => {
		const res = await User.login("test", "1234","syahmij")
		expect(res.verification).toBe(true)
	})

	test("User login successfully", async () => {
		const res = await User.login("test", "1234","syahmij")
		expect(res.verification).toBe(true)
	})
});