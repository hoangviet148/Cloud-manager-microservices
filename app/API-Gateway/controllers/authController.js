const authClient = require("../grpc-client/auth/authClient")

module.exports.register = async (req, res) => {
    console.log("api gateway - register controller")
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

module.exports.createTier = async (req, res) => {
    console.log("api gateway - createTier controller")
    try {
        let tier = {
            "name": req.body.name,
            "cost": req.body.cost,
            "maxIOPerSec": req.body.maxIOPerSec,
            "analytics": req.body.analytics,
        }
        let response = await authClient.createTier(tier);
        console.log("response: ", response)
        return res.status(200).json(response)
    } catch (error) {
        console.log(error + " ")
        return res.status(400).json({ message: error + " " })
    }
}

module.exports.getListTiers = async (req, res) => {
    console.log("api gateway - getListTiers controller")
    try {
        let response = await authClient.getListTiers();
        console.log("response: ", response)
        return res.status(200).json(response)
    } catch (error) {
        console.log(error + " ")
        return res.status(400).json({ message: error + " " })
    }
}

module.exports.getUserByTier = async (req, res) => {
    console.log("api gateway - getUserByTier controller")
    const tier = req.params.tier
    console.log("tier: ", tier)
    try {
        let response = await authClient.getUserByTier({message: tier});
        console.log("response: ", response)
        return res.status(200).json(response)
    } catch (error) {
        console.log(error + " ")
        return res.status(400).json({ message: error + " " })
    }
}