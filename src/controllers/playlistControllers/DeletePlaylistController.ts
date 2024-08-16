import { FastifyRequest, FastifyReply } from "fastify";
import { DeletePlaylistService } from "../../services/playlistServices/DeletePlaylistService"

class DeletePlaylistController {
    async handle(request: FastifyRequest, reply: FastifyReply){
        const { id, user_id } = request.query as { id: string, user_id: string }

        const userService = new DeletePlaylistService();

        const user = await userService.execute({ id, user_id });

        reply.send(user)
    }
}

export { DeletePlaylistController }