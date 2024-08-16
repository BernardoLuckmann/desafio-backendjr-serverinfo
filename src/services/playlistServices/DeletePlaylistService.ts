import prismaClient from "../../prisma";

interface DeletePlaylistProps{
    id: string;
    user_id: string;
}

class DeletePlaylistService{
    async execute({ id, user_id }: DeletePlaylistProps ){

        if(!id){
            throw new Error("É necessário que um ID seja informado para esta solicitação.")
        }

        if(!user_id) {
            throw new Error("É necessário que um usuário seja selecionado para esta solicitação.")
        }

        const findPlaylist = await prismaClient.playlist.findFirst({
            where:{
                id: id,
                user_id: user_id
            }
        })

        if(!findPlaylist){
            throw new Error("Playlist não encontrada.")
        }

        await prismaClient.playlist.delete({
            where:{
                id: findPlaylist.id
            }
        })

        return { message: "Deletado com sucesso." }

    }
}

export { DeletePlaylistService }