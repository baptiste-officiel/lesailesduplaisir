import prisma from '@/app/libs/prisma'
import { NextResponse } from 'next/server'

export const POST = async(request: Request) => {

    try {
        const body = await request.json();
        console.log("🚀 ~ POST ~ body:", body)
        const {
            title,
            imageUrl,
            contentMDX,
            authorId
        } = body;
        console.log("🚀 ~ POST ~ body:", body)

        const newPost = await prisma.post.create({
            data: {
                title,
                imageUrl,
                contentMDX,
                authorId
            }
        })

        return NextResponse.json(newPost);

    } catch (error) {
        console.log("🚀 ~ POST ~ error:", error)
        return NextResponse.json({message: 'L\'article n\'a pas pu être enregistré', error}, {status: 500})
    }
}


export const GET = async() => {

    try {
        const posts = await prisma.post.findMany({
            include: {
                author: true,
              },
        });

        return NextResponse.json(posts);

    } catch (error) {
        return NextResponse.json({message: 'Les articles ne peuvent pas être affichés', error}, {status: 500})

    }
}