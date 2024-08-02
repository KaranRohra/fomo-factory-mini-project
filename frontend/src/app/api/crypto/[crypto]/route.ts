import { NextRequest, NextResponse } from 'next/server';
import { getCryptoCurrencyData } from '../service';

export const GET = async (_request: NextRequest, { params }: { params: { crypto: string } }) => {
  const cryptCurrencyDetails = await getCryptoCurrencyData(params.crypto);
  return NextResponse.json(cryptCurrencyDetails);
};
