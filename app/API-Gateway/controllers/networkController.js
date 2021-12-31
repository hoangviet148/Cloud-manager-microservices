const networkClient = require("../grpc-client/network/networkClient")

module.exports.createNetwork = async (req, res) => {
    console.log("api gateway - createNetwork controller", req.body)
    try {
        let network = {
            "name": req.body.name,
            "ownerID": req.body.ownerID,
            "status": req.body.status,
            "IPv4": req.body.IPv4,
            "dhcp": req.body.dhcp,
            "ipForward": req.body.ip_forward
        }
        let response = await networkClient.createNetwork(network);
        console.log("response: ", response)
        return res.status(200).json(response)
    } catch (error) {
        console.log(error + " ")
        return res.status(400).json({ message: error + " " })
    }
}

module.exports.getAllNetworks = async (req, res) => {
    console.log("api gateway - getAllNetworks controller")
    try {
        let response = await networkClient.getAllNetworks();
        console.log("response: ", response)
        return res.status(200).json(response)
    } catch (error) {
        console.log(error + " ")
        return res.status(400).json({ message: error + " " })
    }
}

module.exports.deleteNetworkByID = async (req, res) => {
    console.log("api gateway - deleteNetworkByID controller")
    try {
        const id = req.params.id;
        let response = await networkClient.deleteNetworkByID({message: id});
        console.log("response: ", response)
        return res.status(200).json(response)
    } catch (error) {
        console.log(error + " ")
        return res.status(400).json({ message: error + " " })
    }
}

module.exports.changeNetworkStatus = async (req, res) => {
    console.log("api gateway - changeNetworkStatus controller")
    try {
        const id = req.params.id;
        let response = await networkClient.changeNetworkStatus({message: id});
        console.log("response: ", response)
        return res.status(200).json(response)
    } catch (error) {
        console.log(error + " ")
        return res.status(400).json({ message: error + " " })
    }
}