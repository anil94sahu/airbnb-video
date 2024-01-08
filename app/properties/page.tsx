import React from 'react'
import getCurrentUser from '../actions/getCurrentUser'
import ClientOnly from '../components/ClientOnly';
import EmptyState from '../components/EmptyState';
import getReservation from '../actions/getReservations';
import TripsClient from './TripsClient';
import getListings from '../actions/getListings';
import PropertyClient from './PropertyClient';


 const  PropertyPage = async() => {

    const currentUser = await getCurrentUser();

    if(!currentUser) {
        return (
            <ClientOnly>
                <EmptyState
                    title='Unauthorized'
                    subtitle='Please login'
                />
            </ClientOnly>
        )
    }

    const listings = await getListings({userId: currentUser.id});

    if(!listings.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                    title='No property found'
                    subtitle='Looks like you havent any property.'
                />
            </ClientOnly>
        )
    }

  return (
    <ClientOnly>
        <PropertyClient 
        listings={listings}
            currentUser={currentUser}
        />
    </ClientOnly>
  )
}

export default PropertyPage