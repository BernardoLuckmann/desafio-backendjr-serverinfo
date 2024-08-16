import { FastifyRequest, FastifyReply } from "fastify";
import { ListUserService } from "../../services/userServices/ListUserService"

class ListUsersController{
    async handle(request: FastifyRequest, reply: FastifyReply){
        const listUserService = new ListUserService();

        const users = await listUserService.execute();

        reply.code(200).send(users);
    }
}

export { ListUsersController }