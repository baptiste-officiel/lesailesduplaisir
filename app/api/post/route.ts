import prisma from '@/app/libs/prisma'
import { NextResponse } from 'next/server'

export const POST = async(request: Request) => {

    try {
        const body = await request.json();
        const {
            title,
            description,
            imageUrl,
            contentMDX,
            authorId
        } = body;

        const newPost = await prisma.post.create({
            data: {
                title,
                description,
                imageUrl,
                contentMDX,
                authorId
            }
        })

        return NextResponse.json(newPost);

    } catch (error) {
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