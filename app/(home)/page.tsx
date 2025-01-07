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
      buttonTitle: 'Contact Me',
      buttonVariant: 'primary',
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
      buttonTitle: 'Contact Me',
      buttonVariant: 'outline',
    },
  ];
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="relative z-40 mx-auto p-2">
        <PriceOverview pricingDetails={pricingDetails} />
      </div>
    </div>
  );
};

export default HomePage;
