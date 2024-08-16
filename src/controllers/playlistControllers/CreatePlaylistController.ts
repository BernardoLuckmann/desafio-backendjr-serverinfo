import { FastifyRequest, FastifyReply } from "fastify";
import { CreatePlaylistService } from '../../services/playlistServices/CreatePlaylistService'

class CreatePlaylistController {
    async handle(request: FastifyRequest, reply: FastifyReply){
        const { name, genre, musics, user_id } = request.body as { name: string, genre: string, musics: string[], user_id: string };

        const playlistService = new CreatePlaylistService();
        const playlist = await playlistService.execute({ name, genre, musics, user_id });

        reply.send(playlist);
    }
}

export { CreatePlaylistController }