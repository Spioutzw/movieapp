import { PrismaClient } from "@prisma/client";

// create prisma connexion but check if already exist
const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === "development") global.prisma = prisma;

export default prisma;

async function getUserinfo(email) {
    const infoUser = await prisma.user.findUnique({
        where: {
            email: email,
        },
        select: {
            avatar: true,
            id: true,
        },
    });
    return infoUser;
}


export { getUserinfo };

