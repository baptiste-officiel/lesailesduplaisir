import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prisma'
import bcrypt from 'bcrypt'


export async function POST(
    request: Request
) {
    const body = await request.json();
    const {
        name,
        email,
        password
    } = body;

    if (!name || !email || !password) {
        return new NextResponse("Missing name, email or password", {status: 400})
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
            name,
            email,
            hashedPassword
        }
    });

    return NextResponse.json(user)
}