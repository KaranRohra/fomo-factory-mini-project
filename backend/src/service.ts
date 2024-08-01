import { Collection, Db, MongoClient, ServerApiVersion } from 'mongodb';
import { CryptoCurrency } from './type';

const uri = 'mongodb+srv://root:Fa7tblgupLkh82fe@mongodb.kwdr3ys.mongodb.net/?retryWrites=true&w=majority&appName=MongoDB';
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const fetchCryptoCurrencyDetails = async (): Promise<CryptoCurrency[]> => {
  try {
    const response = await fetch('https://api.livecoinwatch.com/coins/list', {
      body: JSON.stringify({
        currency: 'USD',
        sort: 'rank',
        order: 'ascending',
        offset: 0,
        limit: 5,
      }),
      headers: {
        'content-type': 'application/json',
        'x-api-key': '5720bf4a-72db-4bb1-9c18-e3d2c642d49f',
      },
      method: 'POST',
    });
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const mongoDbOperations = async (opFuncName: keyof Collection<Document>, params: any | null) => {
  try {
    await client.connect();
    const db: Db = client.db('fomo-factory');
    const collection: any = db.collection('crypto-currency');
    if (params === null) return await collection[opFuncName]();

    return await collection[opFuncName](params);
  } catch (err) {
    console.error('An error occurred:', err);
  } finally {
    await client.close();
  }
};

export const updateCryptoCurrencyDetails = async () => {
  const cryptoCurrencies = await fetchCryptoCurrencyDetails();
  await mongoDbOperations(
    'insertMany',
    cryptoCurrencies.map((cc) => ({ ...cc, fetchedAt: Date.now() }))
  );

  console.log(`[${new Date()}]: Updated crypto currency details`);

  setTimeout(updateCryptoCurrencyDetails, 3000);
};
