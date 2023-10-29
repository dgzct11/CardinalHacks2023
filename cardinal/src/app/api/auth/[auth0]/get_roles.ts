import axios, { AxiosResponse, AxiosError } from 'axios';

export default async function getRoles(
  userId: string
) {
  
  

  try {
    const config = {
      method: 'GET' as const,
      maxBodyLength: Infinity,
      url: `https://dev-b88ptutuuxulei5v.us.auth0.com/api/v2/users/${userId}/roles`,
      headers: {
        authorization: `Bearer ${process.env.AUTH0_MANAGEMENT_API_TOKEN}`
      }
    };

    const response: AxiosResponse = await axios.request(config);

    
    return response.data[0].name;
  } catch (error: unknown) {
    console.log('there was an error', error);
    return { error: 'An unexpected error occurred' };
  }
};
