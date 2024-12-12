import Image from 'next/image';
import aboutData from '../../data/about.json';

const AboutSection = () => {
  return (
    <section className="my-12 max-w-screen-xl mx-auto px-4">
      <div className="flex flex-col items-center">
        <Image
          src="/path-to-your-photo.jpg"
          alt={aboutData.name}
          width={200}
          height={200}
          className="rounded-full object-cover"
          priority
        />
        <h1 className="text-3xl font-bold mt-4">{aboutData.name}</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">{aboutData.introduction}</p>
        <div className="mt-4 max-w-2xl text-center">
          <p className="text-md text-gray-700 dark:text-gray-300">{aboutData.longDescription}</p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;