import express from 'express';
import { updateCryptoCurrencyDetails } from './service';

const app = express();
const PORT = 5000;

app.listen(PORT, () => {
  updateCryptoCurrencyDetails();
  console.log(`Server running on port ${PORT}`);
});
