'use client';
import { FC, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setCryptoData } from '@/store/slice';
import { AppDispatch, RootState } from '@/store/store';
import Dropdown from './Dropdown';
import Table from './Table';

interface IDisplayCryptoData {}

const DisplayCryptoData: FC<IDisplayCryptoData> = () => {
  const { crypto, price } = useAppSelector((state: RootState) => state.crypto);
  const dispatch = useAppDispatch<AppDispatch>();

  const fetchLatestCryptoData = () => {
    dispatch(setCryptoData(crypto));
    setTimeout(fetchLatestCryptoData, 3000);
  };

  useEffect(() => {
    fetchLatestCryptoData();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{crypto}</h1> <h6>Note: Data refreshes every ~3 seconds</h6>
      <Dropdown
        defaultValue="BTC"
        options={['BTC', 'ETH']}
        onSelect={(selectedCrypto: string) => dispatch(setCryptoData(selectedCrypto))}
      />
      <Table cryptoData={price.slice(20)} />
    </div>
  );
};

export default DisplayCryptoData;
