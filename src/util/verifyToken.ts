import axios from 'axios';

export const verifyToken = async (req: any, res: any, next: any) => {
  const token = req.headers['x-access-token'];
  if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });

  try {
    const response = await axios.post(
      'https://user-service-bosi.herokuapp.com/api/verify-token',
      {},
      { headers: { 'x-access-token': token } },
    );
    req.body.user = response.data;
    next();
  } catch (e) {
    res.status(401).json({ auth: false, message: 'Error on token' })
  }
};
