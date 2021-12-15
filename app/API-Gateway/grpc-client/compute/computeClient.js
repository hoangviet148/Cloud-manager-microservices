const caller  = require('grpc-caller')

const client = caller(`${process.env.COMPUTE_SERVER}:8083`, process.env.COMPUTE_PROTO_PATH, 'ComputeService')
console.log(`${process.env.COMPUTE_SERVER}:8083`)
module.exports = client