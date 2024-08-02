'use client';
import { FC, memo, useEffect } from 'react';

import { useRouter } from 'next/navigation';
import CryptoTable from './CryptoTable';
import Dropdown from './Dropdown';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setCryptoData } from '@/store/slice';

interface IDisplayCryptoData {
  cryptoName: string;
  cryptoDropdownOptions: string[];
}

const DisplayCryptoData: FC<IDisplayCryptoData> = ({ cryptoName, cryptoDropdownOptions }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const cryptoData = useAppSelector((state) => state.crypto);
  const fetchLatestCryptoData = () => {
    dispatch(setCryptoData(cryptoName));
  };

  useEffect(() => {
    const interval = setInterval(fetchLatestCryptoData, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{cryptoName}</h1> <h6>Note: Data refreshes every ~5 seconds</h6>
      <Dropdown
        defaultValue={cryptoName}
        options={cryptoDropdownOptions}
        onSelect={(selectedCrypto: string) => router.push(`/?crypto=${selectedCrypto}`)}
      />
      <CryptoTable cryptoData={cryptoData} />
    </div>
  );
};

export default memo(DisplayCryptoData);
