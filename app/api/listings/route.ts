import prisma from '@/app/libs/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';
import { NextResponse } from 'next/server';

export async function POST(
    request: Request
) {
    const currentUser = await getCurrentUser();

    if(!currentUser){
        return NextResponse.error();
    }
    
    console.log(currentUser)
    const body = await request.json();
    console.log('=====================================')

    const {
        category,
        location,
        guestCount,
        roomCount,
        bathroomCount,
        imageSrc,
        price,
        title,
        description
    } = body;

    Object.keys(body).forEach((value:any) => {
        if(!body[value]){
            NextResponse.error();
        }
    })

    const listing = await prisma.listing.create({
        data: {
        category,
        locationValue:location.value,
        guestCount,
        roomCount,
        bathroomCount,
        imageSrc,
        price: parseInt(price, 10),
        title,
        description,
        userId: currentUser.id
        }
    });

    return NextResponse.json(listing);
}

