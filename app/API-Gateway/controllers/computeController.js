const computeClient = require("../grpc-client/compute/computeClient")

module.exports.createCompute = async (req, res) => {
    console.log("api gateway - createCompute controller")
    try {
        let compute = {
            "ownerID": req.body.ownerID,
            "name": req.body.name
            "IPv4": req.body.IPv4,
            "state": req.body.state,
        }
        let response = await computeClient.createCompute(compute);
        console.log("response: ", response)
        return res.status(200).json(response)
    } catch (error) {
        console.log(error + " ")
        return res.status(400).json({ message: error + " " })
    }
}