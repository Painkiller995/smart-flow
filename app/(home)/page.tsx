import PriceOverview from './_components/price-overview';

interface HomePageProps {}

const HomePage = async ({}: HomePageProps) => {
  const pricingDetails = [
    {
      title: 'Free',
      subTitle: 'All the components that are freely available on the website are free to use.',
      features: [
        'A growing library of awesome components',
        'React / Next.js / Tailwind CSS code',
        'Serves a wide variety of audience.',
        'MIT Licence. Personal or commercial projects.',
        'Contact over chat for support',
      ],
    },
    {
      title: 'Free2',
      subTitle: 'All the components that are freely available on the website are free to use.',
      features: [
        'A growing library of awesome components',
        'React / Next.js / Tailwind CSS code',
        'Serves a wide variety of audience.',
        'MIT Licence. Personal or commercial projects.',
        'Contact over chat for support',
      ],
    },
    {
      title: 'Free3',
      subTitle: 'All the components that are freely available on the website are free to use.',
      features: [
        'A growing library of awesome components',
        'React / Next.js / Tailwind CSS code',
        'Serves a wide variety of audience.',
        'MIT Licence. Personal or commercial projects.',
        'Contact over chat for support',
      ],
    },
  ];
  return (
    <div className="flex h-full w-full space-x-5 p-4">
      <PriceOverview pricingDetails={pricingDetails} />
    </div>
  );
};

export default HomePage;
