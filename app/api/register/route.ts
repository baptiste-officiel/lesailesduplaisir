import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prisma'
import bcrypt from 'bcrypt'


export async function POST(
    request: Request
) {
    const body = await request.json();
    const {
        status,
        aeroclubName,
        aeroclubAddress,
        name,
        email,
        password
    } = body;
    console.log("🚀 ~ body:", body)

    if (!status || !name || !email || !password) {
        return new NextResponse("Missing status, name, email or password", {status: 400})
    }
    
    const exist = await prisma?.user.findUnique({
        where: {
            email: email
        }
    })
    if (exist) {
        return new Error("User already exists")        
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            status,
            aeroclubName,
            aeroclubAddress,
            name,
            email,
            hashedPassword
        }
    });

    return NextResponse.json(user)
}