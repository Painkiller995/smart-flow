import AboutMe from './_components/about-me';
import Projects from './_components/projects';

const AboutPage = () => {
  const people = [
    {
      id: 1,
      name: 'Fahd Daher',
      designation: 'Full stack developer',
      image: '/fahd-daher.png',
    },
  ];

  const projects = [
    {
      quote: `SmartFlow automates your workflows, manages repetitive tasks, and ensures seamless operations—freeing you to focus on what truly matters. Think of SmartFlow as your trusted teammate, working tirelessly in the background to optimize processes and boost efficiency. Empower your productivity with SmartFlow, where automation meets reliability.`,
      name: 'SmartFlow',
      designation: 'Your Ultimate Work Partner',
      src: '/smart-flow.png',
    },
    {
      quote: `BOM Matcher is a custom-built solution for Westcontrol, one of Norway's leading companies in turning ideas into reality. This software creates a seamless connection between ERP systems and pick-and-place machines, acting as a safeguard to prevent errors. By adding an extra layer of protection in the Swiss cheese model, BOM Matcher ensures a smooth and error-free production process.`,
      name: 'BOM Matcher',
      designation: 'Validation Before Starting Production',
      src: '/bom-matcher.png',
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
      <AboutMe people={people} />
      <Projects projects={projects} />
    </div>
  );
};

export default AboutPage;
