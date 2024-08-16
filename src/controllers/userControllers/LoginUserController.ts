import { FastifyRequest, FastifyReply } from "fastify";
import { LoginUserService } from "../../services/userServices/LoginUserService"

class LoginUserController{
    async handle(request: FastifyRequest, reply: FastifyReply){
        const { email, password } = request.query as { email: string, password: string }
        const loginUserService = new LoginUserService();

        const users = await loginUserService.execute({ email, password });

        reply.send(users);
    }
}

export { LoginUserController }