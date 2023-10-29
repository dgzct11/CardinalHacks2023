import axios from "axios";
import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';


export default withApiAuthRequired(async function products(req, res) {
    const { name, email, role, userId } = req.body;
    try {
      const { accessToken } = await getAccessToken(req, res);
      
      const auth0Res = await axios.patch(
        `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users/${userId}`,
        {
          user_metadata: { name, email },
          app_metadata: { roles: [role] },
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
  
      res.status(200).json({ success: true });
    } catch(error) {
      console.error(error)
      res.status(error.status || 500).end(error.message)
    }
  });