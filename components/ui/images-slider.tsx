'use client';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useCallback, useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

export const ImagesSlider = ({
  images,
  children,
  overlay = true,
  overlayClassName,
  className,
  autoplay = true,
  direction = 'up',
}: {
  images: string[];
  children: React.ReactNode;
  overlay?: React.ReactNode;
  overlayClassName?: string;
  className?: string;
  autoplay?: boolean;
  direction?: 'up' | 'down';
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadedImages, setLoadedImages] = useState<string[]>([]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1 === images.length ? 0 : prevIndex + 1));
  }, [images.length]);

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 < 0 ? images.length - 1 : prevIndex - 1));
  }, [images.length]);

  const loadImages = useCallback(() => {
    setLoading(true);
    const loadPromises = images.map((image) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = image;
        img.onload = () => resolve(image);
        img.onerror = reject;
      });
    });

    Promise.all(loadPromises)
      .then((loadedImages) => {
        setLoadedImages(loadedImages as string[]);
        setLoading(false);
      })
      .catch((error) => console.error('Failed to load images', error));
  }, [images]);

  useEffect(() => {
    loadImages();
  }, [loadImages]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        handleNext();
      } else if (event.key === 'ArrowLeft') {
        handlePrevious();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // autoplay
    let interval: any;
    if (autoplay) {
      interval = setInterval(() => {
        handleNext();
      }, 5000);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearInterval(interval);
    };
  }, [autoplay, handleNext, handlePrevious]);

  const slideVariants = {
    initial: {
      scale: 0,
      opacity: 0,
      rotateX: 45,
    },
    visible: {
      scale: 1,
      rotateX: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.645, 0.045, 0.355, 1.0],
      },
    },
    upExit: {
      opacity: 1,
      y: '-150%',
      transition: {
        duration: 1,
      },
    },
    downExit: {
      opacity: 1,
      y: '150%',
      transition: {
        duration: 1,
      },
    },
  };

  const areImagesLoaded = loadedImages.length > 0;

  return (
    <div
      className={cn(
        'relative flex h-full w-full items-center justify-center overflow-hidden',
        className
      )}
      style={{
        perspective: '1000px',
      }}
    >
      {areImagesLoaded && children}
      {areImagesLoaded && overlay && (
        <div className={cn('absolute inset-0 z-40 bg-black/60', overlayClassName)} />
      )}

      {areImagesLoaded && (
        <AnimatePresence>
          <motion.img
            key={currentIndex}
            src={loadedImages[currentIndex]}
            initial="initial"
            animate="visible"
            exit={direction === 'up' ? 'upExit' : 'downExit'}
            variants={slideVariants}
            className="image absolute inset-0 h-full w-full object-cover object-center"
          />
        </AnimatePresence>
      )}
    </div>
  );
};
