import { PrismaClient } from "@prisma/client";

// create prisma connexion but check if already exist
const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === "development") global.prisma = prisma;

export default prisma;

async function getAvatarurl(email) {
    const avatarUrl = await prisma.user.findUnique({
        where: {
            email: email,
        },
        select: {
            avatar: true,
        },
    });
    return avatarUrl.avatar;
}

async function getIdUser(email)  {
    const idUser = await prisma.user.findUnique({
        where: {
            email: email,
        },
        select: {
            id: true,
        },
    });
    return idUser.id;
}


export { getIdUser };
export { getAvatarurl };

