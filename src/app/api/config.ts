import { PrismaClient } from "@prisma/client"
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]/config";
export const prisma = new PrismaClient();

export const userSession = async () => {
    return await getServerSession(authOptions);
}