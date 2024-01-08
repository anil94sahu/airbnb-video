'use client'
import React, { useCallback, useState } from 'react'
import { SafeUser, SafeReservation } from '../types'
import Container from './../components/Container';
import Heading from '../components/Heading';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import ListingCard from './../components/listings/ListingCard';

interface TripsClientProps{
    currentUser ? : SafeUser[];
    reservation: SafeReservation | null;
}

const TripsClient = ({
    reservations, currentUser
}) => {
    const router = useRouter();
    const [delegatingId, setDelegatingId] = useState('');

    const onCancel = useCallback((id:string) => {
        setDelegatingId(id);

        axios.delete(`/api/reservations/${id}`)
        .then((response) => {
            toast.success("Reservation cancelled");
            router.refresh();
        })
        .catch((error) => {
            toast.error(error?.response?.data?.error)
        })
        .finally(()=> {
            setDelegatingId('');
        })

    }, [router])
  return (
    <Container>
        <Heading
            title="Trips"
            subtitle="Where you've been and where you're going"
        />
        <div className="mt-10 gird grid-cols-1
        sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
            {
                reservations.map(reservation => (
                    <ListingCard
                        key={reservation.id}
                        data={reservation.listing}
                        reservation={reservation}
                        actionId={reservation.id}
                        onAction={onCancel}
                        disabled={delegatingId=== reservation.id}
                        actionLabel="cancel reservation"
                        currentUser={currentUser}
                    />
                ))
            }
        </div>
    </Container>
    
  )
}

export default TripsClient