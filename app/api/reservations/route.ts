import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import  prisma  from '@/app/libs/prismadb';

export async function POST(request:Request){
    const currentUser = await getCurrentUser();

    const body = await request.json();
    const {
        startDate,
        endDate, 
        listingId,
        totalPrice
    } = body

    if(!startDate || !endDate || !listingId || !totalPrice){
        return NextResponse.error();
    }

    const listingAndReservation = await prisma.listing.update({
        where : {
            id: listingId,
        },
        data : {
            reservation: {
                create: {
                    userId: currentUser.id,
                    startDate,
                    endDate,
                    totalPrice
                }
            }
        }
    })

    return NextResponse.json(listingAndReservation)
}
