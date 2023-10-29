"use server";
import axios, { AxiosResponse, AxiosError } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { encodePipeCharacter } from '../utils/functions';

export default async function updateRole(
  role: string, userId: string
) {
  
  if (!userId || !role) {
    console.log('error');
    return { error: 'User ID and role are required' };
  }
  
  try {
    const config = {
      method: 'POST' as const,
      maxBodyLength: Infinity,
      url: 'https://dev-b88ptutuuxulei5v.us.auth0.com/api/v2/users/google-oauth2%7C108798635333660198952/roles',//`https://dev-b88ptutuuxulei5v.us.auth0.com/api/v2/users/${encodePipeCharacter(userId)}/roles`,
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${process.env.AUTH0_MANAGEMENT_API_TOKEN}`,
        'cache-control': 'no-cache',
      },
      data: { roles: [role] },
    };

    const response: AxiosResponse = await axios.request(config);

    console.log('stuff', response);
    return response;
  } catch (error: unknown) {
    console.log('there was an error', error);
    return { error: 'An unexpected error occurred' };
  }
};


