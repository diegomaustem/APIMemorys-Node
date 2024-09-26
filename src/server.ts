import fastify from 'fastify'
import cors from '@fastify/cors'
import { memoriesRoutes } from './routes/memories'
import { usersRoutes } from './routes/users'

const server = fastify()

server.register(cors, {
    origin: true
})
server.register(memoriesRoutes, usersRoutes)

server.listen({
    port: 1107
}).then(()=>{
    console.log('Running API')
})