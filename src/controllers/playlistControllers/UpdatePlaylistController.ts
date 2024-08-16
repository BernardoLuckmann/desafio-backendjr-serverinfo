import { FastifyRequest, FastifyReply } from "fastify";
import { UpdatePlaylistService } from "../../services/playlistServices/UpdatePlaylistService"

class UpdatePlaylistController {
    async handle(request: FastifyRequest, reply: FastifyReply){
        const { id, name, genre, musics, user_id } = request.query as { id: string, name: string, genre: string, musics: string, user_id: string }

        const userService = new UpdatePlaylistService();

        const playlist = await userService.execute({ id, name, genre, musics, user_id });

        reply.send(playlist)
    }
}

export { UpdatePlaylistController }