import prismaClient from "../../prisma";

enum Role {
    ADMIN = 'ADMIN',
    USER = 'USER'
  }

interface CreateUserProps {
    name: string;
    email: string;
    password: string;
    role: Role;
}

class CreateUserService {
    async execute({ name, email, password, role}: CreateUserProps) {

        if(!name || !email || !password){
            throw new Error("Preencha os campos obrigatórios.");
        }

        const checkUserUnique = await prismaClient.user.findFirst({
            where: {
                email: email,
            },
        })

        if (checkUserUnique) {
            return new Error("Um usuário já está cadastrado com este email.")
        }

        const user = await prismaClient.user.create({
            data:{
                name,
                email,
                password,
                role
            }
        })

        return user
    }
}

export { CreateUserService, Role }