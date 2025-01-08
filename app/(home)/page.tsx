'use client';

import Hero, { HeroProps } from './_components/hero';
import PriceOverview, { PriceOverviewProps } from './_components/price-overview';
import { UseCaseCards } from './_components/use-case-cards';

interface HomePageProps {}

const HomePage = ({}: HomePageProps) => {
  const title: HeroProps['title'] = [
    { text: 'AI' },
    { text: 'Powered' },
    { text: 'Automated' },
    { text: 'Workflows', className: 'text-blue-500 dark:text-blue-500' },
  ];

  const images = [
    'https://images.unsplash.com/photo-1485433592409-9018e83a1f0d?q=80&w=1814&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1483982258113-b72862e6cff6?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1482189349482-3defd547e0e9?q=80&w=2848&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  ];

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
  const useCaseCards = [
    {
      title: 'Automated Data Processing',
      description:
        'Streamline data analysis by automatically processing inputs through predefined workflows, saving time and minimizing errors.',
    },
    {
      title: 'AI-Powered Workflows',
      description: 'Leverage AI to enhance workflows, making tasks smarter and more efficient.',
    },
    {
      title: 'Email Marketing Automation',
      description:
        'Design email campaigns that are triggered by user interactions, ensuring timely and personalized communication with your audience.',
    },
    {
      title: 'Inventory Management',
      description:
        'Integrate your inventory system with automated reorder workflows, ensuring optimal stock levels without the need for manual checks.',
    },
    {
      title: 'Invoice Generation',
      description:
        'Automatically generate and send invoices based on customer transactions, reducing administrative overhead and improving efficiency.',
    },
    {
      title: 'Event Registration',
      description:
        'Create automated workflows for event registration, including confirmation emails, reminders, and participant updates.',
    },
  ];

  return (
    <div>
      <Hero title={title} images={images} />
      <div className="pb-40 md:px-4 md:pt-20 lg:px-8">
        <div className="mx-auto max-w-2xl text-center lg:max-w-4xl">
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Discover Limitless Possibilities
          </h1>
        </div>
        <UseCaseCards useCaseCards={useCaseCards} />
        <p className="mx-auto mb-20 mt-1 max-w-lg text-center text-lg leading-8 text-gray-600 dark:text-gray-200">
          There are countless use cases and powerful features.
        </p>
        <h2 className="mb-10 mt-20 text-center text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
          Transparent pricing with no surprises.
        </h2>
        <div className="relative z-40 mx-auto p-2">
          <PriceOverview pricingDetails={pricingDetails} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
