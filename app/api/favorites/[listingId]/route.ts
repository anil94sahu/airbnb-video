import prisma from '@/app/libs/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';
import { NextResponse } from 'next/server';

interface IParams{
    listingId: string;
}

export async function POST(
    request: Request,
    {params} : {params : IParams}
){
    const currentUser = await getCurrentUser();

    const {listingId} = params;

    if(!listingId || typeof listingId !== "string"){
        throw new Error("Invalid ID")
    }

    let favorites = [...(currentUser?.favoriteIds) || []];
    favorites.push(listingId);

    const user = await prisma.user.update({
        where : {
            id:currentUser?.id
        },
        data: {
            favoriteIds:favorites
        }
    })

    return NextResponse.json(user)
}

export async function DELETE(
    request:Request,
    {params} : {params: IParams}
){
    const currentUser = await getCurrentUser();

    const {listingId} = params;

    if(!listingId || typeof listingId !== "string"){
        throw new Error("Invalid ID")
    }

    let favorites = [...(currentUser?.favoriteIds) || []];
    favorites = favorites.filter(id => id !== listingId);

    const user = await prisma.user.update({
        where : {
            id: currentUser?.id
        },
        data: {
            favoriteIds:favorites
        }
    })
    return NextResponse.json(user)
}