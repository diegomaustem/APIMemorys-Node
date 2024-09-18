import fastify from 'fastify'

const server = fastify()

server.listen({
    port: 1107
}).then( () => {
    console.log("Running server")
})