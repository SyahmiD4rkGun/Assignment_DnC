let users;
const bcrypt = require("bcryptjs")
class User {
    static async injectDB(conn) {
        users = await conn.db("Blood_Banking_System").collection("users")
    }

    static async register(username, password) {
        // TODO: Check if username exists
        const db = users
            db
            .find({ "name": username }, { $exists: true })
            .toArray(function (err, doc) //find if a value exists
            {
                if (doc && doc.length) //if it does
                {
                    console.log(doc); // print out what it sends back

                }
                else // if it does not 
                {
                    console.log("Not in docs");

                }
            })
        // TODO: Hash password

        const saltRounds = 10
        const newPass = await bcrypt.hashSync(password, saltRounds)

        // TODO: Save user to database
        const data = {
            name: username,
            password: newPass,
            verification : true
        }
        const result = await db.insertOne(data)
        return result

    }

    static async login(username, password) {
        // TODO: Check if username exists
        const db = users
        // test, 1234
        const result2 = await db.findOne({"name": username})
        
        if (!result2) {
            console.log("Not found name")
            return
        }

        const validate = bcrypt.compare(password,result2.password);
                    if (
                        validate == false
                    ) {
                        console.log('Invalid')
                        return false
                    }
                    else{
                        console.log('Verified')
                        return true
                    }
                

        // TODO: Return user object
        return result2;
    }
}

module.exports = User;