type TechItem = {
  name: string;
  url: string;
};

type ExperienceItemProps = {
  position: string;
  company: string;
  location: string;
  period: string;
  description: string;
  technologies: TechItem[];
};

export default ExperienceItemProps;