import express from 'express';
const app = express();
const port = 3000;

app.get('/users', (req, res) => {
  res.send('PUser Service!');
});

app.listen(port, () => {
  console.log(`User service running at http://localhost:${port}`);
});
