import prismaClient from "../../prisma";
import { Role } from './CreateUserService'

interface UpdateUserProps{
    id: string;
    name: string;
    email: string;
    password: string;
    role: Role;
}

class UpdateUserService{
    async execute({ id, name, email, password, role }: UpdateUserProps ){

        if(!id){
            throw new Error("É necessário que um ID seja informado para esta solicitação.")
        }

        if(!name || !email || !password || !role) {
            throw new Error("É necessário preencher todos os campos para a atualização.")
        }

        const findUser = await prismaClient.user.findFirst({
            where:{
                id: id
            }
        })

        if(!findUser){
            throw new Error("Usuário não encontrado.")
        }

        await prismaClient.user.update({
            where: {
                id: id
            },
            data: {
                name: name,
                email: email,
                password: password,
                role: role
            }
        })

        return { message: "Atualizado com sucesso." }

    }
}

export { UpdateUserService }