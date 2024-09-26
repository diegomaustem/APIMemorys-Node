import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod"

export async function memoriesRoutes(server: FastifyInstance) {
    server.get('/memories', async () => {
        const memories = await prisma.memory.findMany({
            orderBy:{
                createdAt: 'asc'
            }
        })

        return memories
    })

    server.post('/memory', async (request) => {
        const bodySchema = z.object({
            content: z.string(),
            coverUrl: z.string(),
            isPublic: z.coerce.boolean().default(false),
            userId: z.string()
        })

        const { content, coverUrl, isPublic, userId} = bodySchema.parse(request.body)

        const memory = await prisma.memory.create({
            data:{
                content,
                coverUrl,
                isPublic,
                userId
            }
        })

        return memory
    })

    server.get('/memory/:id', async (request) => {
        const paramsSchema = z.object({
            id: z.string()
        })

        const { id } = paramsSchema.parse(request.params) 
        
        const memory = await prisma.memory.findUniqueOrThrow({
            where: {
                id
            },
        })

        return memory
    })

    server.put('/memory/:id', async (request) => {
        const paramsSchema = z.object({
            id: z.string()
        })
        const bodySchema = z.object({
            content: z.string(),
            coverUrl: z.string(),
            isPublic: z.coerce.boolean().default(false),
            userId: z.string()
        })

        const { id } = paramsSchema.parse(request.params) 
        const { content, coverUrl, isPublic, userId} = bodySchema.parse(request.body)

        const memory = await prisma.memory.update({
            where: {
                id
            },
            data: {
                content, 
                coverUrl, 
                isPublic,
                userId
            }
        })    
        
        return memory
    })

    server.delete('/memory/:id', async (request) => {
        const paramsSchema = z.object({
            id: z.string()
        })

        const { id } = paramsSchema.parse(request.params) 
        
        await prisma.memory.delete({
            where: {
                id
            },
        }) 
    })
}