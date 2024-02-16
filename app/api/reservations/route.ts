import prisma from '@/app/libs/prisma'
import { NextResponse } from 'next/server'

export const POST = async(request: any) => {

    try {
        const body = await request.json();
        const {
            activity,
            withPilot,
            startDate,
            endDate,
            userId
        } = body;
        console.log("🚀 ~ POST ~ body:", body)

        const newReservation = await prisma.reservation.create({
            data: {
                activity,
                withPilot,
                startDate,
                endDate,
                userId
            }
        })
        console.log("🚀 ~ POST ~ newReservation:", newReservation)

        return NextResponse.json(newReservation);

    } catch (error) {
        return NextResponse.json({message: 'La prestation n\'a pas pu être enregistrée', error}, {status: 500})
    }
}

// export const GET = async() => {

//     try {
//         const prestations = await prisma.prestation.findMany()

//         return NextResponse.json(prestations);

//     } catch (error) {
//         return NextResponse.json({message: 'Les prestations ne peuvent pas être affichées', error}, {status: 500})
//     }
// }