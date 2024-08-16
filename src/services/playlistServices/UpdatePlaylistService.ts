import prismaClient from "../../prisma";

interface UpdatePlaylistProps{
    id: string;
    name: string;
    genre: string;
    musics: string;
    user_id: string;
}

class UpdatePlaylistService{
    async execute({ id, name, genre, musics, user_id }: UpdatePlaylistProps ){

        if(!id){
            throw new Error("É necessário que um ID seja informado para esta solicitação.")
        }

        const musicArray = musics.split(";");

        if(!name || !genre || !musics || !user_id) {
            throw new Error(genre)
        }

        const findPlaylist = await prismaClient.playlist.findFirst({
            where:{
                id: id
            }
        })

        if(!findPlaylist){
            throw new Error("Playlist não encontrada.")
        }

        await prismaClient.playlist.update({
            where: {
                id: id
            },
            data: {
                name: name,
                genre: genre,
                musics: musicArray,
                user_id: user_id
            }
        })

        return { message: "Atualizada com sucesso." }

    }
}

export { UpdatePlaylistService }