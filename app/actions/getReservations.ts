import  prisma  from '@/app/libs/prismadb';

interface IParams{
    userId?: string;
    authorId?: string;
    listingId?: string;
}

export default async function getReservation(
    params: IParams
){
    try {
        const {listingId, userId, authorId} = params;

    const query:any = {};
    
    if(listingId){
        query.listingId = listingId;
    }

    if(userId){
        query.userId = userId;
    }

    if(authorId){
        query.listing = {userId: authorId};
    }

    const reservations = await prisma.reservation.findMany({
        where:query,
        include: {
            listing: true
        },
        orderBy: {
            createdDate: 'desc'
        }
    });

    const safeReservations = reservations.map(reservation =>({
        ...reservation,
        createdDate: reservation.createdDate.toISOString(),
        startDate: reservation.startDate.toISOString(),
        endDate: reservation.endDate.toISOString(),
        listing: {
            ...reservation.listing,
            createdDate: reservation.createdDate.toISOString(),
        }
    }))

    return safeReservations;
    } catch (error) {
         throw new Error(error);   
    }
    
}