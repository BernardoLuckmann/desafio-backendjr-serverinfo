import { FastifyRequest, FastifyReply } from "fastify";
import { CreateUserService, Role } from '../../services/userServices/CreateUserService'

class RegisterUserController {
    async handle(request: FastifyRequest, reply: FastifyReply){
        const { name, email, password } = request.body as { name: string, email: string, password: string };

        const role = 'USER' as Role

        const userService = new CreateUserService();
        const user = await userService.execute({ name, email, password, role });

        reply.code(201).send(user);
    }
}

export { RegisterUserController }