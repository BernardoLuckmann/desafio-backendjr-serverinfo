import prismaClient from "../../prisma";

interface LoginUserProps {
    email: string;
    password: string;
}

class LoginUserService{
    async execute({ email, password }: LoginUserProps){

        const users = await prismaClient.user.findFirst({
            where: {
                email: email,
                password: password
            }
        });

        return users;

    }
}

export { LoginUserService }