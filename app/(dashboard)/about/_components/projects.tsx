'use client';

import { useEffect, useState } from 'react';

import { AnimatedProjects } from '@/components/ui/animated-projects';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ProjectsProps {
  projects: {
    description: string;
    projectName: string;
    status: string;
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
        <AnimatedProjects projects={projects} />
      </CardContent>
    </Card>
  );
};

export default Projects;
