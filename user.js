let users;
const bcrypt = require("bcryptjs")
class User {
    static async injectDB(conn) {
        users = await conn.db("Blood_Banking_System").collection("users")
    }

    static async register(username, password, BT,age,email) {
        // TODO: Check if username exists
        const db = users
        const user = await db.findOne({
                "name": username
            })
            if(user){
                return false
            }
        // TODO: Hash password

        const saltRounds = 10
        const newPass = await bcrypt.hashSync(password, saltRounds)

        // TODO: Save user to database
        const data = {
            name: username,
            E_mail: email,
            password: newPass,
            verification : true,
            Data:{
                Age : age,
                Blood_Type : BT

            }
            
        }
        const result = await db.insertOne(data)
        return result

    }

    static async login(username, password, BT,age,email) {
        // TODO: Check if username exists
        const db = users
        // test, 1234
        const result2 = await db.findOne({"name": username})
        
        if (!result2) {
            console.log("Not found name")
            return
        }

        const validate = await bcrypt.compare(password,result2.password);
                    if (
                        !validate
                    ) {
                        console.log('Invalid')
                        return false
                    }
        console.log('Verified')
        return true
                    
                

        // TODO: Return user
    }

    static async update(username, password, BT,age,email){
        const db = users
        const saltRounds = 10
        const newPass = await bcrypt.hashSync(password, saltRounds)

        const result3 = await db.findOne({"name" : username});
        if(!result3){
            return false
        }
        return await db.updateOne({
            "name": username
        },{
            $set : { 
                name: username,
                password : newPass
            }
        })
    }
    static async delete(username, password, BT,age,email){
        const db = users
        const result4 = await db.findOne({"name": username});
        if(!result4){
            return false
        }
        return await db.deleteOne({"name" : username })
    }
    static async check(username, password, BT,age,email){
        const db = users
        const result5 = await db.findOne({"name": username});
        if(!result5){
            return false
        }
        return await result5
    }
}

module.exports = User;