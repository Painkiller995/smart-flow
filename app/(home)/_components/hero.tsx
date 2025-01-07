'use client';
import { ImagesSlider } from '@/components/ui/images-slider';
import { TypewriterEffectSmooth } from '@/components/ui/typewriter-effect';
import { motion } from 'framer-motion';

export default function Hero() {
  const words = [
    {
      text: 'Build',
    },
    {
      text: 'awesome',
    },
    {
      text: 'apps',
    },
    {
      text: 'with',
    },
    {
      text: 'Aceternity.',
      className: 'text-blue-500 dark:text-blue-500',
    },
  ];

  const images = [
    'https://images.unsplash.com/photo-1485433592409-9018e83a1f0d?q=80&w=1814&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1483982258113-b72862e6cff6?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1482189349482-3defd547e0e9?q=80&w=2848&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  ];

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
        <motion.p className="bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text py-4 text-center text-xl font-bold text-transparent md:text-6xl">
          The hero section slideshow <br /> nobody asked for
        </motion.p>
        <TypewriterEffectSmooth words={words} />
        <div className="flex flex-col space-x-0 space-y-4 md:flex-row md:space-x-4 md:space-y-0">
          <button className="h-10 w-40 rounded-xl border border-transparent bg-black text-sm text-white dark:border-white">
            Join now
          </button>
          <button className="h-10 w-40 rounded-xl border border-black bg-white text-sm text-black">
            Signup
          </button>
        </div>
      </motion.div>
    </ImagesSlider>
  );
}
