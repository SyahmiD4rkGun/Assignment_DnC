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
	const data = {
		id: "22",
		name: "syahmi",
		password: "try99",
		Email: "syahlol@gmail.com",
		details: [
			{Age: "29",
			Blood_Type: "A"}
		]
	}
	afterAll(async () => {
		await client.close();
	})

	test("Register New User", async () => {
		const res = await User.register("22","syahmi","syah22","syahmi@gmail.com",[{Age:"22",Blood_Type:"A"}])
		expect(res.acknowledged).toBe(true)
	})

	test("User login", async () => {
		const res = await User.login("22","syahmi","syah22","syahmi@gmail.com",[{Age:"22",Blood_Type:"A"}])
		expect(res.status).toBe("verified")
	})

	test("User info update", async () => {
		const res = await User.update("22","zul","syah22","syahmi@gmail.com",[{Age:"22",Blood_Type:"A"}])
		expect(res.acknowledged).toBe(true)
	})

	test("Find User data", async () => {
		const res = await User.check("22","zul","syah22","syahmi@gmail.com",[{Age:"22",Blood_Type:"A"}])
		expect(res.id).toBe("22")
	})
	test("User delete", async () => {
		const res = await User.delete("22","zul","syah22","syahmi@gmail.com",[{Age:"22",Blood_Type:"A"}])
		expect(res.acknowledged).toBe(true)
	})
});