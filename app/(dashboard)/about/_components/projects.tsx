'use client';

import { AnimatedTestimonials } from '@/components/ui/animated-testimonials';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect, useState } from 'react';

interface ProjectsProps {
  projects: {
    quote: string;
    name: string;
    designation: string;
    src: string;
  }[];
}

const Projects = ({ projects }: ProjectsProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Card className="w-full pt-2">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Projects:</CardTitle>
      </CardHeader>
      <CardContent>
        <AnimatedTestimonials testimonials={projects} />
      </CardContent>
    </Card>
  );
};

export default Projects;
