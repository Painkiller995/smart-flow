interface HomePageProps {}

const HomePage = async ({}: HomePageProps) => {
  return (
    <div className="flex h-full flex-1 flex-col">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Hello World</h1>
      </div>
    </div>
  );
};

export default HomePage;
