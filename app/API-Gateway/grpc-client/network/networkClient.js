const caller  = require('grpc-caller')

const client = caller(`${process.env.NETWORK_SERVER}:8082`, process.env.NETWORK_PROTO_PATH, 'NetworkService')
console.log(`${process.env.NETWORK_SERVER}:8082`)
module.exports = client