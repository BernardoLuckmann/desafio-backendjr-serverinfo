import { FastifyRequest, FastifyReply } from "fastify";
import { CreateUserService, Role } from '../../services/userServices/CreateUserService'

class CreateUserController {
    async handle(request: FastifyRequest, reply: FastifyReply){
        const { name, email, password, role } = request.body as { name: string, email: string, password: string, role: Role };

        const userService = new CreateUserService();
        const user = await userService.execute({ name, email, password, role });

        reply.code(201).send(user);
    }
}

export { CreateUserController }