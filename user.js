let users;
const bcrypt = require("bcryptjs")
class User {
    static async injectDB(conn) {
        users = await conn.db("Blood_Banking_System").collection("users")
    }

    static async register(idno,username, password,email,details) {
        // TODO: Check if username exists
        const db = users
        const user = await db.findOne({
                id: idno
            })
            if(user){
                return false
            }
        // TODO: Hash password

        const saltRounds = 10
        const newPass = await bcrypt.hashSync(password, saltRounds)

        // TODO: Save user to database
        const data = {
            id: idno,
            name: username,
            Email: email,
            password: newPass,
            verification : true,
            details: details
            
            
        }
        const result = await db.insertOne(data)
        return result

    }

    static async login(idno,username, password,email,details) {
        // TODO: Check if username exists
        const db = users
        // test, 1234
        const result2 = await db.findOne({id: idno})
        
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

    static async update(idno,username, password,email,details){
        const db = users
        const saltRounds = 10
        const newPass = await bcrypt.hashSync(password, saltRounds)

        const result3 = await db.findOne({id : idno});
        if(!result3){
            return false
        }
        return await db.updateOne({
            "id": idno
        },{
            $set : { 
            name: username,
            Email: email,
            password: newPass,
            details: details
            }
        })
    }
    static async delete(idno,username, password,email,details){
        const db = users
        const result4 = await db.findOne({id: idno});
        if(!result4){
            return false
        }
        return await db.deleteOne({id : idno })
    }
    static async check(idno,username, password,email,details){
        const db = users
        const result5 = await db.findOne({id: idno});
        if(!result5){
            return false
        }
        return await result5
    }
}

module.exports = User;