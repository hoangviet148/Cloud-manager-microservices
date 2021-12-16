const networkClient = require("../grpc-client/network/networkClient")

module.exports.createNetwork = async (req, res) => {
    console.log("api gateway - createNetwork controller")
    try {
        let network = {
            "ownerID": req.body.ownerID,
            "name": req.body.name,
            "IPv4": req.body.IPv4,
            "state": req.body.state,
        }
        let response = await networkClient.createNetwork(network);
        console.log("response: ", response)
        return res.status(200).json(response)
    } catch (error) {
        console.log(error + " ")
        return res.status(400).json({ message: error + " " })
    }
}