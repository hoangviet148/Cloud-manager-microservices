const authClient = require("../grpc-client/auth/authClient")

module.exports.register = async (req, res) => {
    try {
        let user = {
            "username": req.body.username,
            "password": req.body.password,
            "role": "user",
            "email": req.body.email,
            "phone": req.body.phone,
            "payment": req.body.payment,
            "tier": req.body.tier
        }
        let response = await authClient.register(user);
        console.log("response: ", response)
        return res.status(200).json(response)
    } catch (error) {
        console.log(error + " ")
        return res.status(400).json({ message: error + " " })
    }
}

module.exports.login = async (req, res) => {
    try {
        console.log(req.body)
        let user = {
            "email": req.body.email,
            "password": req.body.password
        }
        let response = await authClient.login(user);
        console.log("response: ", response)
        return res.status(200).json(response)
    } catch (error) {
        console.log(error + " ")
        return res.status(400).json({ message: error + " " })
    }
}

module.exports.deleteUser = async (req, res) => {
    try {

    } catch (error) {

    }
}