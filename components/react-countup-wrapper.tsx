'use client';

import { useEffect, useState } from 'react';
import CountUp from 'react-countup';

const ReactCountupWrapper = ({ value }: { value: number }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return '-';
  }

  return <CountUp duration={0.5} preserveValue end={value} decimals={0} />;
};

export default ReactCountupWrapper;
