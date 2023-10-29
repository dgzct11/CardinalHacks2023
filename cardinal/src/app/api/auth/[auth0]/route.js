// app/api/auth/[auth0]/route.js
import { handleAuth, handleCallback } from '@auth0/nextjs-auth0';
import { redirect } from 'next/navigation';
import getRoles from './get_roles'
const afterCallback =  async (req, session, state) => {
  try{
    const roles = await getRoles(session.user.sub);

    console.log("ROLLLLLEES:", roles);
    if (roles.includes("patient")){
      state.returnTo = '/patient/dashboard';
    }
    else if(roles.includes("doctor")){
      state.returnTo = '/doctor/dashboard';
    }
    else {
      state.returnTo = '/user_profile';
    }
  
    return session;
  }catch(e){
    state.returnTo = '/user_profile';
    return session;
  }
};

export const GET = handleAuth({
  callback: handleCallback({ afterCallback })
});