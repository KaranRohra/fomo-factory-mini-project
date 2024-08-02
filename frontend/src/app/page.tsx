import { notFound } from 'next/navigation';
import DisplayCryptoData from './components/DisplayCryptoData';

export default async function Home({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }) {
  const cryptoName = ((searchParams && searchParams['crypto']) || 'BTC').toString();
  const dropdownResponse = await fetch('http://localhost:3000/api/crypto/options');
  const cryptoDropdownOptions: string[] = await dropdownResponse.json();
  if (!cryptoDropdownOptions.includes(cryptoName)) return notFound();

  return (
    <div className="p-6">
      <DisplayCryptoData cryptoName={cryptoName} cryptoDropdownOptions={cryptoDropdownOptions || []} />
    </div>
  );
}
