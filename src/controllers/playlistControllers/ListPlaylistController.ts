import { FastifyRequest, FastifyReply } from "fastify";
import { ListPlaylistService } from "../../services/playlistServices/ListPlaylistService"

class ListPlaylistController{
    async handle(request: FastifyRequest, reply: FastifyReply){
        const { user_id } = request.headers as { user_id: string }
        const listPlaylistService = new ListPlaylistService();

        const playlist = await listPlaylistService.execute( { user_id } );

        reply.send(playlist);

        
    }
}

export { ListPlaylistController }