"use client"
import { SessionProvider } from 'next-auth/react';
import React from 'react'

type SessionWrapperProps = {
  children: React.ReactNode;
};

const SessionWraper = ({ children }: SessionWrapperProps) => {
  return (
    <SessionProvider>{children}</SessionProvider>
  )
}

export default SessionWraper