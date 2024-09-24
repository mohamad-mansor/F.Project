import express from "express";
const app = express();
const port = 3000;

import { Router } from 'express'; 
export const UserRouter = Router();


app.use(express.json());


app.get('/check-mail', (req, res) => {
  res.send('Check mail route');
});


app.post('/check-signup', (req, res) => {
  
  res.send('Signup checked');
});


app.post('/check-signin', (req, res) => {
  
  res.send('Sign-in checked');
});


app.post('/check-post', (req, res) => {
  
  res.send('Post created');
});


app.delete('/check-delete', (req, res) => {
  
  res.send('Resource deleted');
});


app.patch('/check-patch', (req, res) => {
  
  res.send('Resource updated');
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
