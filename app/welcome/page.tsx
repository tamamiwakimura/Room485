"use client";

import React from 'react';
import Navbar from '../components/Navbar';
import { useSession } from 'next-auth/react';
import { Session } from 'next-auth'; 
import { redirect } from 'next/navigation';

function Welcome() {
  const { data: session } = useSession(); 
  console.log(session);
  if(!session) redirect("/login");
  return (
    <div>
      <Navbar session={session as Session | null} /> 
      <h3>Welcome {session?.user?.name}</h3>
    </div>
  );
}

export default Welcome;
