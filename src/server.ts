import fastify from "fastify";
import { adminRoutes, publicRoutes, userRoutes } from "./routes";

const app = fastify({ logger: true })

app.setErrorHandler((error, request, reply) => {
    reply.code(400).send({ message: error.message })
})

const start = async () => {

    await app.register(adminRoutes);
    await app.register(userRoutes);
    await app.register(publicRoutes);

    try {
        await app.listen({ port: 3939})
    } catch (err) {
        process.exit(1);
    }
}

start();