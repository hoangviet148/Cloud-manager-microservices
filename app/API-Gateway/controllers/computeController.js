const computeClient = require("../grpc-client/compute/computeClient")

module.exports.createInstance = async (req, res) => {
    console.log("api gateway - createCompute controller")
    try {
        let compute = {
            "hostname": req.body.hostname,
            "ownerID": req.body.ownerID,
            "networkID": req.body.networkID,
            "status": req.body.status,
            "disk": req.body.disk,
            "cpu": req.body.cpu,
            "ram": req.body.ram,
            "IPv4": req.body.ip
        }
        let response = await computeClient.createInstance(compute);
        console.log("response: ", response)
        return res.status(200).json(response)
    } catch (error) {
        console.log(error + " ")
        return res.status(400).json({ message: error + " " })
    }
}

module.exports.getListInstances = async (req, res) => {
    console.log("api gateway - getListInstances controller")
    try {
        let response = await computeClient.getListInstances();
        console.log("response: ", response)
        return res.status(200).json(response)
    } catch (error) {
        console.log(error + " ")
        return res.status(400).json({ message: error + " " })
    }
}

module.exports.getInstanceByID = async (req, res) => {
    console.log("api gateway - getInstanceByID controller")
    try {
        let id = req.params.id;
        console.log("InstanceID:", id)
        let response = await computeClient.getInstanceByID({ id: id });
        console.log("response: ", response)
        return res.status(200).json(response)
    } catch (error) {
        console.log(error + " ")
        return res.status(400).json({ message: error + " " })
    }
}

module.exports.changeInstanceStatus = async (req, res) => {
    console.log("api gateway - changeInstanceStatus controller")
    try {
        console.log("body:", req.body)
        let response = await computeClient.changeInstanceStatus({
            "_id": req.body._id,
            "status": req.body.status
        });
        console.log("response: ", response)
        return res.status(200).json(response)
    } catch (error) {
        console.log(error + " ")
        return res.status(400).json({ message: error + " " })
    }
}