'use client';

import Image from 'next/image';
import { useState } from 'react';

export function Logo() {
  const [showFallback, setShowFallback] = useState(false);

  return (
    <div className="flex h-10 items-center sm:h-11">
      {showFallback ? (
        <span className="truncate text-sm font-semibold tracking-wide text-white sm:text-base lg:text-lg">Harleys Realtor</span>
      ) : (
        <Image
          src="/images/logo.jpg"
          alt="Harleys Realtor"
          width={190}
          height={40}
          priority
          className="h-9 w-auto max-w-[150px] object-contain sm:h-10 sm:max-w-[190px]"
          onError={() => setShowFallback(true)}
        />
      )}
    </div>
  );
}
