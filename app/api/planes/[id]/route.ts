import prisma from '@/app/libs/prisma'
import { NextResponse } from "next/server";

export const DELETE = async(request: any, { params }: any) => {
    try {
        
        const { id } = params; 
        const planeId = Number(id)       
        console.log("🚀 ~ DELETE ~ id:", planeId)

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