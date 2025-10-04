'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const POSSystemPage = dynamic(
  () => import('@/components/pos/POSSystem'))

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50" suppressHydrationWarning>
      <Suspense fallback={<div>Loading POS System...</div>}>
        <POSSystemPage />
      </Suspense>
    </div>
  );
}
