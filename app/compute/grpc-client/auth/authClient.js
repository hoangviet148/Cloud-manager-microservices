const caller  = require('grpc-caller')

const client = caller(`${process.env.AUTH_SERVER}:8081`, process.env.AUTH_PROTO_PATH, 'AuthService')
console.log(`${process.env.AUTH_SERVER}:8081`)
module.exports = client