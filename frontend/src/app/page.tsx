import Image from 'next/image';

export default function Home() {
  return (
    <main>
      <h1>Welcome to the Next.js app</h1>
      <Image src="/favicon.ico" alt="Next.js logo" width={200} height={200} />
    </main>
  );
}
