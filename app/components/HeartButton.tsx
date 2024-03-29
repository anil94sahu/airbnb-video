import React from 'react'
import { SafeUser } from '../types';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import useFavorite from '../hooks/useFavorite';

interface HeartButtonProps {
    listingId:string;
    currentUser?: SafeUser | null
}

const HeartButton:React.FC<HeartButtonProps> = ({
    listingId, currentUser
}) => {

    const {hasFavourited, toggleFavorite} = useFavorite({listingId, currentUser});

  return (
    <div className="relative hover:opacity-80 transition cursor-pointer"
     onClick={toggleFavorite}
    >
        <AiOutlineHeart size={28} 
            className="fill-white absolute -top-[2px] -right-[2px]"
        />
        <AiFillHeart size={24} 
        className={
            hasFavourited?'fill-rose-500' : 'fill-neutral-500/70'
        } />
    </div>
  )
}

export default HeartButton