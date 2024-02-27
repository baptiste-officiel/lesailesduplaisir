import prisma from '@/app/libs/prisma'
import { NextResponse } from "next/server";

export const GET = async(request: Request, { params }: any) => {

    try {

        const { id } = params; 
        const planeId = Number(id)       

        const planes = await prisma.plane.findUnique({
            where: {
                id: planeId
            }
        });

        return NextResponse.json(planes);

    } catch (error) {
        return NextResponse.json({message: 'Les avions ne peuvent pas être affichés', error}, {status: 500})

    }
}

export const PUT = async(request: any, { params }: any) => {
    try {
        const body = await request.json()
        const {
            name,
                img,
                seats,
                vmax,
                weight,
        } = body

        const { id } = params;
        const planeId = Number(id)       

        const updatedPost = await prisma.plane.update({
            where: {
                id: planeId
            },
            data: {
                name,
                img,
                seats,
                vmax,
                weight,
            }
        })

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
        const planeId = Number(id)       

        await prisma.plane.delete({
            where: {
                id: planeId
            }
        })

        return NextResponse.json('Post has been deleted');

    } catch (error) {
        console.log("🚀 ~ DELETE ~ error:", error)
        return NextResponse.json({message: 'POST error', error}, {status: 500})
    }
}