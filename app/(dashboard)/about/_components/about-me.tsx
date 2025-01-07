'use client';

import { AnimatedTooltip } from '@/components/ui/animated-tooltip';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IconBrandGithub, IconBrandLinkedin } from '@tabler/icons-react';
import Link from 'next/link';

interface AboutMeProps {
  people: {
    id: number;
    name: string;
    designation: string;
    image: string;
  }[];
}

const AboutMe = ({ people }: AboutMeProps) => {
  return (
    <Card className="w-full pt-2">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Projects:</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex w-full">
          <div className="flex flex-col space-y-5">
            <div className="flex flex-row items-center gap-7">
              <AnimatedTooltip items={people} />
              <h1 className="text-3xl font-bold">Hi There!</h1>
            </div>
            <p className="text-lg text-muted-foreground">
              I hope you enjoy exploring this project and find the implementation that meets your
              needs. Your feedback is highly appreciated, as it helps me enhance my skills and
              refine my vision for future projects. Thank you for taking the time to share your
              thoughts!
            </p>
            <div className="flex w-full flex-row items-center justify-center space-x-2">
              <Link href="https://no.linkedin.com/in/fahddaher995">
                <Button className="w-30 h-30" variant="ghost">
                  <IconBrandLinkedin style={{ width: '30px', height: '30px' }} />
                </Button>
              </Link>
              <Link href="https://github.com/Painkiller995">
                <Button className="w-30 h-30" variant="ghost">
                  <IconBrandGithub style={{ width: '30px', height: '30px' }} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AboutMe;
