import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs"

export async function POST(request:NextRequest) {
    try {
    const {name, email, password} = await request.json()
    if(!email || !password || !name)
    {
        return NextResponse.json({message:"All credentials required for regestration"}, {status:400})
    }

    const existingUser = await prisma.user.findUnique({
        where:{
            email:email
        }
    })
    if(existingUser)
    {
        return NextResponse.json({message:"User already exists."}, {status:400})
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    const newUser = await prisma.user.create({
        data:{
            name:name,
            email:email,
            password:hashedPassword
        }
    })

    return NextResponse.json({message:{newUser}}, {status:200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:"Internal server error in register route"}, {status:500})
    }
}