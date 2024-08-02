import express from 'express';
import { cleanUpDb, updateCryptoCurrencyDetails } from './service';

const app = express();
const PORT = 5000;

app.listen(PORT, () => {
  cleanUpDb();
  updateCryptoCurrencyDetails();
  console.log(`Server running on port ${PORT}`);
});
