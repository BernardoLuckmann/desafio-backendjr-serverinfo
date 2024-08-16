import { FastifyRequest, FastifyReply } from "fastify";
import { UpdateUserService } from "../../services/userServices/UpdateUserService"
import { Role } from '../../services/userServices/CreateUserService'

class UpdateUserController {
    async handle(request: FastifyRequest, reply: FastifyReply){
        const { id, name, email, password, role } = request.query as { id: string, name: string, email: string, password: string, role: Role }

        const userService = new UpdateUserService();

        const user = await userService.execute({ id, name, email, password, role });

        reply.code(201).send(user);

    }
}

export { UpdateUserController }