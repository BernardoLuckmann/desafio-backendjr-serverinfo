import prismaClient from "../../prisma";

interface ListPlaylistProps {
    user_id: string;
}

class ListPlaylistService{
    async execute({ user_id }: ListPlaylistProps){

        if(!user_id) {
            throw new Error("É necessário estar cadastrado como algum usuário para visualizar as playlists.")
        }

        const playlists = await prismaClient.playlist.findMany({
            where: { 
                user_id: user_id
            }
        });

        if(!playlists) {
            throw new Error("Nenhuma playlist foi encontrada.")
        }

        return playlists;

    }
}

export { ListPlaylistService }