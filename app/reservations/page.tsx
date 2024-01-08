import React from 'react'
import getCurrentUser from '../actions/getCurrentUser'
import ClientOnly from './../components/ClientOnly';
import EmptyState from './../components/EmptyState';
import ReservationsClient from './ReservationsClient';
import getReservation from '../actions/getReservations';


const ReservationsPage = async () => {
    const currentUser = await getCurrentUser();

    if(!currentUser){
        <ClientOnly>
            <EmptyState 
            title="Unauthorized"
            subtitle="Please login" />
        </ClientOnly>
    }

    const reservations = await getReservation({
        authorId: currentUser.id
    });

    if(!reservations.length === 0){
        return(
            <ClientOnly>
                <ReservationsClient 
                    currentUser={currentUser}
                    reservations={reservations}
                />
            </ClientOnly>
        )
    }

  return (
    <div>ReservationsPage</div>
  )
}

export default ReservationsPage