import { CryptoCurrency } from "./type";

const fetchCryptoCurrencyDetails = async (): Promise<CryptoCurrency[]> => {
  try {
    const response = await fetch('https://api.livecoinwatch.com/coins/list', {
      body: JSON.stringify({
        "currency": "USD",
        "sort": "rank",
        "order": "ascending",
        "offset": 0,
        "limit": 5
      }),
      headers: {
        'content-type': 'application/json',
        'x-api-key': '5720bf4a-72db-4bb1-9c18-e3d2c642d49f'
      },
      method: 'POST',
    })
    return await response.json()
  } catch (error) {
    console.error(error)
    return [];
  }
}

export const updateCryptoCurrencyDetails = async () => {
  const cryptoCurrencies = await fetchCryptoCurrencyDetails()
  // Add data to MongoDB
  cryptoCurrencies.forEach(cryptoCurrency => {
    console.log(cryptoCurrency.code)
  })
  console.log(`[${new Date()}]: Updated crypto currency details`)

  setTimeout(updateCryptoCurrencyDetails, 5000);
}

