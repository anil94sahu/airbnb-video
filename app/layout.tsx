import {Nunito} from 'next/font/google';
import type { Metadata } from 'next'
import './globals.css'
import Navbar from './components/navbar/Navbar';
import React from 'react';
import ClientOnly from './components/ClientOnly';
import Modal from './components/modals/Modal';
import RegisterModal from './components/modals/RegisterModal';
import ToasterProvider from './providers/ToasterProvider';
import LoginModal from './components/modals/LoginModal';
import getCurrentUser from './actions/getCurrentUser';
import RentModal from './components/modals/RentModal';


const font = Nunito({
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Airbnb',
  description: 'Airbnb clone',
}


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
      <ClientOnly>
        <LoginModal/>
        <RegisterModal/>
        <RentModal />
        <ToasterProvider />
        <Navbar currentUser = {currentUser}/>
        </ClientOnly>
      {children}
      </body>
    </html>
  )
}
