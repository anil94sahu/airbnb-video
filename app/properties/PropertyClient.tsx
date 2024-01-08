'use client'
import React, { useCallback, useState } from 'react'
import { SafeUser, SafeReservation, SafeListing } from '../types'
import Container from '../components/Container';
import Heading from '../components/Heading';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import ListingCard from '../components/listings/ListingCard';

interface PropertyClientProps{
    currentUser ? : SafeUser[];
    listings: SafeListing | null;
}

const PropertyClient = ({
    listings, currentUser
}) => {
    const router = useRouter();
    const [delegatingId, setDelegatingId] = useState('');

    const onCancel = useCallback((id:string) => {
        setDelegatingId(id);

        axios.delete(`/api/listing/${id}`)
        .then((response) => {
            toast.success("Property cancelled");
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
            title="Property"
            subtitle="Property listing"
        />
        <div className="mt-10 gird grid-cols-1
        sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
            {
                listings.map(listing => (
                    <ListingCard
                        key={listing.id}
                        data={listing}
                        
                        actionId={listing.id}
                        onAction={onCancel}
                        disabled={delegatingId=== listing.id}
                        actionLabel="Delete Property"
                        currentUser={currentUser}
                    />
                ))
            }
        </div>
    </Container>
    
  )
}

export default PropertyClient