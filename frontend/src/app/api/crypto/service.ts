import { Db, MongoClient, ServerApiVersion } from 'mongodb';
import { CryptoCurrency } from './type';

const uri = 'mongodb+srv://root:Fa7tblgupLkh82fe@mongodb.kwdr3ys.mongodb.net/?retryWrites=true&w=majority&appName=MongoDB';
export const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const getCryptoCurrencyData = async (cryptoCode: string): Promise<CryptoCurrency[]> => {
  try {
    await client.connect();
    const db: Db = client.db('fomo-factory');
    const collection = db.collection('crypto-currency');

    return (await collection.find({ code: cryptoCode }).sort('fetchedAt', -1).toArray()).map(
      (crypto): CryptoCurrency => ({
        code: crypto.code,
        rate: crypto.rate,
        volume: crypto.volume,
        cap: crypto.cap,
        fetchedAt: crypto.fetchedAt,
      })
    );
  } catch (err) {
    console.error('An error occurred:', err);
    return [];
  } finally {
    await client.close();
  }
};

export const getCryptoDropdownOptions = async (): Promise<string[]> => {
  try {
    await client.connect();
    const db: Db = client.db('fomo-factory');
    const collection = db.collection('crypto-currency');

    return Array.from(new Set<string>((await collection.find().sort('fetchedAt', -1).toArray()).map((crypto) => crypto.code)));
  } catch (err) {
    console.error('An error occurred:', err);
    return [];
  } finally {
    await client.close();
  }
};
