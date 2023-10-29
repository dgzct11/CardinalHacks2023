// app/api/auth/[auth0]/route.js
import { handleAuth, handleCallback } from '@auth0/nextjs-auth0';
import { redirect } from 'next/navigation';

const afterCallback = (req, session, state) => {
  
    
    state.returnTo = '/user_profile';
    
  
    return session;
};

export const GET = handleAuth({
  callback: handleCallback({ afterCallback })
});