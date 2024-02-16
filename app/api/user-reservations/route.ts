// import prisma from '@/app/libs/prisma'
// import { getSession } from 'next-auth/react'
// import { NextRequest, NextResponse } from 'next/server'
// import { authOptions } from '../auth/[...nextauth]/route'
// import { getCurrentUser } from '@/app/libs/getSession'
// import { getServerSession } from 'next-auth/next'


// export const GET = async() => {

//     const session = await getServerSession(authOptions)
//     console.log("🚀 ~ GET ~ session:", session)

//     if (!session) {
//         return NextResponse.json({ message: 'User not authenticated' }, { status: 401 })
//     }

//     try {
//         const reservations = await prisma.reservation.findMany({
//             include: {
//                 user: true,
//               },
//         })
//         console.log("🚀 ~ GET ~ reservations:", reservations)

//         return NextResponse.json(reservations);

//     } catch (error) {
//         return NextResponse.json({message: 'Les reservations ne peuvent pas être affichées', error}, {status: 500})
//     }
// }