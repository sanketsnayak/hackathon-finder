import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
interface AuthorizeProps {
    email: string;
    password: string;
}

const authorized = async (credentials: AuthorizeProps) => {
    try {
        const { email, password } = credentials
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return null;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return null;
        }

        return {
            id: user.id,
            name: user.name,
            email: user.email,
        };
    } catch (error) {
        console.error("Authorization error:", error);
        return null;
    }
};

export default authorized;
