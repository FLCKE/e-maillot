import express from 'express';
const app = express();
const port = 3000;

app.get('/products', (req, res) => {
  res.send('Product Service!!!');
});

app.listen(port, () => {
  console.log(`Product service running at http://localhost:${port}`);
});
