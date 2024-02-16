import prisma from '@/app/libs/prisma'
import { NextResponse } from 'next/server';

export const GET = async() => {

    try {
        const planes = await prisma.plane.findMany();

        return NextResponse.json(planes);

    } catch (error) {
        return NextResponse.json({message: 'Les avions ne peuvent pas être affichés', error}, {status: 500})

    }
}