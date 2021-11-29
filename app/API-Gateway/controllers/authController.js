const authClient = require("../grpc-client/auth/authClient")

module.exports.register = async (req, res) => {
    try {
        console.log(req.body)
        let response = authClient.register(req.body);
        return res.status(200).json({message: response})
    } catch (error) {
        console.log(error + " ")
        return res.status(400).json(error + " ")
    }
}

module.exports.login = async (req, res) => {
    try {
        let response = authClient.login();
    } catch (error) {
        console.log(error + " ")
        return res.status(400).json(error + " ")
    }
}