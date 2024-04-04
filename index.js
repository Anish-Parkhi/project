import cors from 'cors';
import express from 'express';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello');
});

app.listen(3000, () => {
  console.log('App is listening on port 3000');
});
