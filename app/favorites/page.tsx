import React from 'react'
import getCurrentUser from '../actions/getCurrentUser'
import ClientOnly from '../components/ClientOnly'
import EmptyState from '../components/EmptyState'
import getFavoriteListings from '../actions/getFavoriteListings'
import FavoritesClient from './FavoritesClient'

const ListingPage = async () => {
    const listings = await getFavoriteListings();
    const currentUser = await getCurrentUser();

    if(listings.length === 0) {
        return (
            <ClientOnly>
                <EmptyState 
                    title='No favorites found in your favorites'
                    subtitle='Looks like you have no favorites'
                />
            </ClientOnly>
            
        )
    }
  return (
    <ClientOnly>
        <FavoritesClient
            currentUser = {currentUser}
            listings={listings}
        />
    </ClientOnly>
  )
}

export default ListingPage