"use client";

import Image from "next/image";
import aboutData from "@/data/about.json";

const AboutSection = () => {
  return (
    <section className="my-16 max-w-screen-xl mx-auto px-6 sm:px-12 lg:px-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-16 items-center">

        <div className="flex justify-center sm:justify-end lg:-ml-10"> 
          <Image
            src={aboutData.image}
            alt={aboutData.name}
            width={300}
            height={300}
            sizes="(max-width: 640px) 200px, (max-width: 1024px) 250px, 300px"
            className="rounded-full object-cover shadow-lg"
            priority
          />
        </div>

        {/* Texto y descripción */}
        <div className="text-center sm:text-left">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
            {aboutData.name}
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-300 mt-2">
            {aboutData.role}
          </p>
          <p className="text-md text-gray-700 dark:text-gray-400 mt-4">
            {aboutData.introduction}
          </p>
          <p className="text-md text-gray-600 dark:text-gray-300 mt-2">
            {aboutData.longDescription}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            {aboutData.location}
          </p>

          {/* Skills */}
          <div className="mt-6 max-w-lg mx-auto sm:mx-0">
            <h3 className="text-md font-semibold text-gray-800 dark:text-gray-200 mb-4 sm:mb-2">
              Skills & Tools:
            </h3>
            <ul className="flex flex-wrap justify-center sm:justify-start gap-2">
              {aboutData.skills.map((skill) => (
                <li
                  key={skill}
                  className="text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
