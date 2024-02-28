import prisma from '@/app/libs/prisma'
import { NextResponse } from "next/server";

export const GET = async(request: Request, { params }: any) => {

    try {

        const { id } = params; 
        const postId = Number(id)       
        console.log("🚀 ~ GET ~ postId:", postId)

        const post = await prisma.post.findUnique({
            where: {
                id: postId
            },
            include: {
                author: true,
              },
        });

        return NextResponse.json(post);

    } catch (error) {
        return NextResponse.json({message: 'Les avions ne peuvent pas être affichés', error}, {status: 500})

    }
}

export const PUT = async(request: any, { params }: any) => {
    try {
        const body = await request.json()
        const {
            title,
            imageUrl,
            contentMDX,
            authorId
        } = body;
        console.log("🚀 ~ PUT ~ body:", body)

        const { id } = params;
        const postId = Number(id)       

        const updatedPost = await prisma.post.update({
            where: {
                id: postId
            },
            data: {
                title,
                imageUrl,
                contentMDX,
                authorId
            }
        })
        console.log("🚀 ~ PUT ~ updatedPost:", updatedPost)

        if (!updatedPost) {
            return NextResponse.json({message: 'No post'}, {status: 404}) 
        }

        return NextResponse.json(updatedPost);

    } catch (error) {
        return NextResponse.json({message: 'UPDATE error', error}, {status: 500})
    }
}

export const DELETE = async(request: any, { params }: any) => {
    try {
        
        const { id } = params; 
        const postId = Number(id)       

        await prisma.post.delete({
            where: {
                id: postId
            }
        })

        return NextResponse.json('Post has been deleted');

    } catch (error) {
        console.log("🚀 ~ DELETE ~ error:", error)
        return NextResponse.json({message: 'POST error', error}, {status: 500})
    }
}