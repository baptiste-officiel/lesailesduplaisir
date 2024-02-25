import prisma from '@/app/libs/prisma'
import { NextResponse } from 'next/server';

export const POST = async(request: Request) => {

    try {
        const body = await request.json();
        const {
            name,
            img,
            seats,
            vmax,
            weight,
        } = body;
        console.log("🚀 ~ POST ~ bodyPlane:", body)

        const newPlane = await prisma.plane.create({
            data: {
                name,
                img,
                seats,
                vmax,
                weight,
            }
        })
        console.log("🚀 ~ POST ~ newPlane:", newPlane)

        return NextResponse.json(newPlane);

    } catch (error) {
        return NextResponse.json({message: 'L\'avion n\'a pas pu être enregistré', error}, {status: 500})
    }
}

export const GET = async() => {

    try {
        const planes = await prisma.plane.findMany();

        return NextResponse.json(planes);

    } catch (error) {
        return NextResponse.json({message: 'Les avions ne peuvent pas être affichés', error}, {status: 500})

    }
}