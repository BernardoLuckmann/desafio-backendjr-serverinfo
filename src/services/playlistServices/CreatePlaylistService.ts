import prismaClient from "../../prisma";

interface CreatePlaylistProps {
    name: string;
    genre: string;
    musics: string[];
    user_id: string;
}

class CreatePlaylistService {
    async execute({ name, genre, musics, user_id}: CreatePlaylistProps) {

        if(!name || !user_id){
            throw new Error("Preencha os campos obrigatórios.")
        }

        const playlist = await prismaClient.playlist.create({
            data:{
                name,
                genre,
                musics,
                user_id
            }
        })

        return playlist
    }
}

export { CreatePlaylistService }