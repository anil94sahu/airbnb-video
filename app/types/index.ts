import {Reservation, User} from '@prisma/client'
import { SafeListing } from '@/app/types';

export type SafeListing = Omit<Listing, "createdAt"> & {
    createdAt: string;
}

export type SafeUser = omit<User, "createdAt" | "updatedAt" | "emailVerified">
& {
    createdAt: string;
    updatedAt: string;
    emailVerified: string | null;
}

export type SafeReservation = Omit<Reservation, "createdAt" | "startDate" | "endDate" | "listing"> & {
    createdAt: string;
    startDate: string;
    endDate: string;
    listing: SafeListing
}