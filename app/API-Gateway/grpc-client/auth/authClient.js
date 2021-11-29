const caller  = require('grpc-caller')

const client = caller('localhost:8081', process.env.AUTH_PROTO_PATH, 'AuthService')

module.exports = client