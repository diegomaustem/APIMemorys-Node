import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod"

export async function usersRoutes(server: FastifyInstance) {
    server.get('/users', async () => {
        const users = await prisma.user.findMany({
            orderBy:{
                createdAt: 'asc'
            }
        })

        return users
    })

    server.post('/user', async (request) => {
        // Validation with zod bellow
        const bodySchema = z.object({
            name: z.string(),
            email: z.string(),
            avatarUrl: z.string()
        })

        const { name, email, avatarUrl } = bodySchema.parse(request.body)

        const user = await prisma.user.create({
            data:{
                name,
                email,
                avatarUrl
            }
        })

        return user
    })

    server.get('/user/:id', async (request) => {
        const paramsSchema = z.object({
            id: z.string()
        })

        const { id } = paramsSchema.parse(request.params) 
        
        const user = await prisma.user.findUniqueOrThrow({
            where: {
                id
            },
        })

        return user
    })

    server.put('/user/:id', async (request) => {
        // Validation with zod bellow
        const paramsSchema = z.object({
            id: z.string()
        })
        const bodySchema = z.object({
            name: z.string(),
            email: z.string(),
            avatarUrl: z.string()
        })

        const { id } = paramsSchema.parse(request.params) 
        const { name, email, avatarUrl } = bodySchema.parse(request.body)

        const user = await prisma.user.update({
            where: {
                id
            },
            data: {
                name, 
                email, 
                avatarUrl 
            }
        })    
        
        return user
    })

    server.delete('/user/:id', async (request) => {
        const paramsSchema = z.object({
            id: z.string()
        })

        const { id } = paramsSchema.parse(request.params) 
        
        await prisma.user.delete({
            where: {
                id
            },
        }) 
    })
}