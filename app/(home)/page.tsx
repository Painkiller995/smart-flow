'use client';

import Hero from './_components/hero';
import PriceOverview, { PriceOverviewProps } from './_components/price-overview';
import { Usage } from './_components/usage';

interface HomePageProps {}

const HomePage = ({}: HomePageProps) => {
  const pricingDetails: PriceOverviewProps['pricingDetails'] = [
    {
      title: 'Credit-Based',
      subTitle:
        'Pay as you go. Just sign in and purchase the package that fits your needs and usage capacity.',
      features: [
        'Ideal for personal use or small teams.',
        'Get access to the latest workflow tasks as they become available.',
        'Affordable pricing designed to fit individual and small-scale needs.',
        'Instant access upon purchase with no waiting time.',
        'Track your usage and remaining credits through a user-friendly dashboard.',
      ],
      buttonTitle: 'Sign in',
      buttonVariant: 'default',
      onClick: () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      },
    },
    {
      title: 'Enterprise',
      subTitle:
        'Based in Norway? Partner with me to sign a license agreement that grants you access to the full source code. Host the project on your local server or preferred cloud provider to reduce costs and maintain full control.',
      features: [
        'Significantly reduce hosting costs by managing it in-house.',
        'Request custom tasks to integrate your systems with SmartFlow seamlessly.',
        'Ensure high-level security with data stored exclusively on your own servers.',
        'Comprehensive documentation to help you add and manage custom tasks.',
        'Collaborate directly with me to tailor the project to your specific needs.',
      ],
      buttonTitle: 'Contact Me',
      buttonVariant: 'outline',
      onClick: () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      },
    },
  ];
  return (
    <div>
      <Hero />
      <div className="pb-40 md:px-4 md:pt-20 lg:px-8">
        <div className="mx-auto max-w-2xl text-center lg:max-w-4xl">
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Need custom components or websites?
            <span className="relative z-10 bg-gradient-to-t from-blue-600 to-blue-600/[0.8] bg-clip-text text-transparent dark:text-white">
              {' '}
              We've got you covered
            </span>
          </h1>
        </div>
        <Usage />
        <p className="mx-auto mb-20 mt-6 max-w-lg text-center text-lg leading-8 text-gray-600 dark:text-gray-200">
          From custom components to complete website tailored to your needs. Simple pricing, no
          hidden fees.
        </p>
        <div className="relative z-40 mx-auto p-2">
          <PriceOverview pricingDetails={pricingDetails} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
