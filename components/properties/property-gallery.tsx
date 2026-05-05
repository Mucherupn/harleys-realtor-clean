'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getSafeImageSrc } from '@/lib/utils/image';

type PropertyGalleryProps = {
  title: string;
  images: string[];
};

export function PropertyGallery({ title, images }: PropertyGalleryProps) {
  const normalizedImages = useMemo(() => {
    const unique = images
      .map((image) => getSafeImageSrc(image))
      .filter((value, index, array) => Boolean(value) && array.indexOf(value) === index);
    return unique.length > 0 ? unique : [getSafeImageSrc(null)];
  }, [images]);

  const [activeIndex, setActiveIndex] = useState(0);

  const showControls = normalizedImages.length > 1;

  const goNext = () => {
    setActiveIndex((index) => (index + 1) % normalizedImages.length);
  };

  const goPrev = () => {
    setActiveIndex((index) => (index - 1 + normalizedImages.length) % normalizedImages.length);
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-[#f3f4f6]">
        <Image
          src={normalizedImages[activeIndex]}
          alt={`${title} image ${activeIndex + 1}`}
          fill
          className="object-cover"
          sizes="(min-width: 1280px) 66vw, (min-width: 768px) 80vw, 100vw"
        />
        {showControls ? (
          <>
            <Button type="button" variant="secondary" className="absolute left-3 top-1/2 h-10 w-10 -translate-y-1/2 px-0" onClick={goPrev}>
              <ChevronLeft size={18} />
            </Button>
            <Button type="button" variant="secondary" className="absolute right-3 top-1/2 h-10 w-10 -translate-y-1/2 px-0" onClick={goNext}>
              <ChevronRight size={18} />
            </Button>
          </>
        ) : null}
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1 sm:gap-3">
        {normalizedImages.map((image, index) => {
          const isActive = index === activeIndex;

          return (
            <button
              type="button"
              key={`${image}-${index}`}
              onClick={() => setActiveIndex(index)}
              className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border transition sm:h-20 sm:w-28 ${
                isActive ? 'border-[#c01717] ring-2 ring-[#c01717]/20' : 'border-[#d8dee6] hover:border-[#b4bdc9]'
              }`}
              aria-label={`View image ${index + 1}`}
            >
              <Image src={image} alt={`${title} thumbnail ${index + 1}`} fill className="object-cover" sizes="112px" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
