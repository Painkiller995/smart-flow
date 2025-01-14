'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { ImagesSlider } from '@/components/ui/images-slider';
import { TypewriterEffectSmooth } from '@/components/ui/typewriter-effect';

export type HeroProps = {
  title: {
    text: string;
    className?: string;
  }[];
  images: string[];
};

export default function Hero({ title, images }: HeroProps) {
  return (
    <ImagesSlider className="h-[40rem]" images={images}>
      <motion.div
        initial={{
          opacity: 0,
          y: -80,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="z-50 flex flex-col items-center justify-center"
      >
        <TypewriterEffectSmooth words={title} />
        <div className="flex flex-col space-x-0 space-y-4 md:flex-row md:space-x-4 md:space-y-0">
          <Link href={'/sign-in'}>
            <Button className="h-10 w-40 rounded-xl border border-transparent border-white bg-black text-sm text-white">
              Sign in
            </Button>
          </Link>
          <Link href={'/sign-up'}>
            <Button className="h-10 w-40 rounded-xl border border-transparent border-white bg-white text-sm text-black">
              Signup
            </Button>
          </Link>
        </div>
      </motion.div>
    </ImagesSlider>
  );
}
