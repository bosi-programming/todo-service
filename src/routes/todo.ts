import express from 'express';
import axios from 'axios';

import { Todo } from '../model/todo';

const todoRouter = express.Router();

todoRouter.post('/api/todo', async (req, res) => {
  const token = req.headers['x-access-token'];

  if (!token)
    return res.status(401).json({ auth: false, message: "No token provided." });

  try {
  axios.post('https://user-service-bosi.herokuapp.com/api/verify-token', {}, { headers: { 'x-access-token': token } })
    .then((response) => {
      console.log(response);
      res.status(200).send();
    }).catch((e) => {
      throw e;
    });
  } catch(e) {
    res.status(e.status).json(e);
  }
});

export default todoRouter;
