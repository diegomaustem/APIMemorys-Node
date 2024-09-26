import fastify from 'fastify'
import { memoriesRoutes } from './routes/memories'
import { usersRoutes } from './routes/users'

const server = fastify()

server.register(memoriesRoutes, usersRoutes)

server.listen({
    port: 1107
}).then(()=>{
    console.log('Running API')
})