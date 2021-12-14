const caller  = require('grpc-caller')

const client = caller(`${process.env.SERVER_ADDRESS}:8081`, process.env.AUTH_PROTO_PATH, 'AuthService')

module.exports = client