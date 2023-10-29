import axios from "axios";
import {withApiAuthRequired } from '@auth0/nextjs-auth0';


export const POST =  withApiAuthRequired(async function products(req, res) {
  const { role, userId } = await req.json();
    console.log("role: ", role);
  if (!userId || !role) {
    console.log("error");
  }

  try {
    /*
    const response = await axios.post(
      `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users/${userId}/roles`,
      {
        roles: [role], // role IDs you want to assign
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.AUTH0_MANAGEMENT_API_TOKEN}`,
        },
      }
    );
    */
    let config = {
        method: 'POST',
        maxBodyLength: Infinity,
        url: 'https://dev-b88ptutuuxulei5v.us.auth0.com/api/v2/users/google-oauth2%7C108798635333660198952/roles',
        headers: { 
            'content-type': 'application/json',
            authorization: `Bearer ${process.env.AUTH0_MANAGEMENT_API_TOKEN}`,
            'cache-control': 'no-cache'
        }, 
        data: {roles: [role]}
      };
      
      const response = await axios.request(config);
    
      console.log("stuff");
    return response;
  } catch (error) {
    console.log("there was an error", error)
    return error;
  }
})

