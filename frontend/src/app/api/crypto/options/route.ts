import { NextResponse } from 'next/server';
import { getCryptoDropdownOptions } from '../service';

export const GET = async () => {
  return NextResponse.json(await getCryptoDropdownOptions());
};
