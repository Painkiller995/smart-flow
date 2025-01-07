import { AnimatedTestimonials } from '@/components/ui/animated-testimonials';
import { AnimatedTooltip } from '@/components/ui/animated-tooltip';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AboutPage = () => {
  const people = [
    {
      id: 1,
      name: 'Fahd Daher',
      designation: 'Full stack developer',
      image:
        'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80',
    },
  ];

  const projects = [
    {
      quote: `SmartFlow automates your workflows, manages repetitive tasks, and ensures seamless operations—freeing you to focus on what truly matters. Think of SmartFlow as your trusted teammate, working tirelessly in the background to optimize processes and boost efficiency. Empower your productivity with SmartFlow, where automation meets reliability.`,
      name: 'SmartFlow',
      designation: 'Your Ultimate Work Partner',
      src: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      quote: `BOM Matcher is a custom-built solution for Westcontrol, one of Norway's leading companies in turning ideas into reality. This software creates a seamless connection between ERP systems and pick-and-place machines, acting as a safeguard to prevent errors. By adding an extra layer of protection in the Swiss cheese model, BOM Matcher ensures a smooth and error-free production process.`,
      name: 'BOM Matcher',
      designation: 'Validation Before Starting Production',
      src: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  ];

  return (
    <div className="flex h-full flex-1 flex-col space-y-5">
      <div className="flex p-2">
        <div className="flex max-w-2xl flex-col space-y-4">
          <h1 className="text-3xl font-bold">SmartFlow</h1>
          <p className="text-lg text-muted-foreground">
            SmartFlow is your ultimate work partner, designed to take the load off your shoulders.
          </p>
        </div>
      </div>
      <Card className="w-full pt-2">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Projects:</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex w-full">
            <div className="flex max-w-2xl flex-col space-y-4">
              <div className="flex flex-row items-center gap-5">
                <AnimatedTooltip items={people} />
                <h1 className="text-3xl font-bold">Hi There!</h1>
              </div>
              <p className="text-lg text-muted-foreground">
                I hope you enjoy the project and find the correct implementaiton for you need. feel
                free to give me a feed back which i will set a really value for it since it will
                helpe me improve my skilss and sharp my vision for future projects
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="w-full pt-2">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Projects:</CardTitle>
        </CardHeader>
        <CardContent>
          <AnimatedTestimonials testimonials={projects} />
        </CardContent>
      </Card>
      <div className="h-full py-6"></div>
    </div>
  );
};

export default AboutPage;
