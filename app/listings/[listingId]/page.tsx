
import getListingById from "@/app/actions/getListingById";
import ClientOnly from './../../components/ClientOnly';
import EmptyState from './../../components/EmptyState';
import ListingClient from './ListingClient';
import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservation from "@/app/actions/getReservations";

interface IParams{
    listingId?:string;
}

const ListingPage =  async ({params}: {params:IParams}) => {
    const listing =  await getListingById(params);
    const currentUser = await getCurrentUser();
    const reservation = await getReservation(params);

    if(!listing) {
        return(
            <ClientOnly >
                <EmptyState />
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <ListingClient
                listing={listing}
                reservation={reservation}
                currentUser = {currentUser}
            />
        </ClientOnly>
    )

}

export default ListingPage