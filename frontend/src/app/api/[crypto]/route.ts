import { Collection, Db, MongoClient, ServerApiVersion } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';
import { CryptoCurrency } from './type';

const uri = 'mongodb+srv://root:Fa7tblgupLkh82fe@mongodb.kwdr3ys.mongodb.net/?retryWrites=true&w=majority&appName=MongoDB';
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const getCryptoCurrencyData = async (cryptoCode: string) => {
  try {
    await client.connect();
    const db: Db = client.db('fomo-factory');
    const collection = db.collection('crypto-currency');

    return await collection.find({ code: cryptoCode }).sort('fetchedAt').toArray();
  } catch (err) {
    console.error('An error occurred:', err);
  } finally {
    await client.close();
  }
};
export const GET = async (_request: NextRequest, { params }: { params: { crypto: string } }) => {
  const cryptCurrencyDetails = await getCryptoCurrencyData(params.crypto);
  console.log(cryptCurrencyDetails);
  return NextResponse.json(cryptCurrencyDetails);
};
