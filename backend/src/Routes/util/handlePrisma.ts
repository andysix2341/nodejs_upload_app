import { PrismaClient } from "@prisma/client"
import { UpdateUserData, UserData } from "../../../custom"

const prisma = new PrismaClient()

export async function saveUserData(data: UserData) {
    try {
        await prisma.user_data.create({ data })
        await prisma.$disconnect()
    } catch(err) {
        console.error(err)
        await prisma.$disconnect()
        process.exit(1)
    }
}

export async function getUsersData() {
    try {
        const data = await prisma.user_data.findMany()
        await prisma.$disconnect()
        return data
    } catch(err) {
        console.error(err)
        await prisma.$disconnect()
        process.exit(1)
    }
}

export async function getUserData(user_id: string) {
    try {
        const data = await prisma.user_data.findUnique({
            where: {user_id}
        })
        await prisma.$disconnect()
        return data
    } catch(err) {
        console.error(err)
        await prisma.$disconnect()
        process.exit(1)
    }
}

export async function updateUserData(user_id: string, data:UpdateUserData) {
    try {
        const userData = await prisma.user_data.update({
            where: {
                user_id
            },
            data
        })
        return userData
    } catch(err) {
        console.error(err)
        await prisma.$disconnect()
        process.exit(1)
    }
}

export async function deleteUserData(user_id: string) {
    try {
        return await prisma.user_data.delete({ where: { user_id } })
    } catch(err) {
        console.error(err)
        await prisma.$disconnect()
        process.exit(1)
    }
}