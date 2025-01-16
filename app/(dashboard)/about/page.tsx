import AboutMe from './_components/about-me';
import Projects from './_components/projects';

const AboutPage = () => {
  const people = [
    {
      id: 1,
      name: 'Fahd Daher',
      designation: 'Data Science Undergraduate',
      image: '/fahd-daher.png',
    },
  ];

  const projects = [
    {
      projectName: 'SmartFlow',
      status: 'Alpha Release Phase',
      description: `SmartFlow automates your workflows, manages repetitive tasks, and ensures seamless operations—freeing you to focus on what truly matters. Think of SmartFlow as your trusted teammate, working tirelessly in the background to optimize processes and boost efficiency. Empower your productivity with SmartFlow, where automation meets reliability.`,
      src: '/smart-flow.png',
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
