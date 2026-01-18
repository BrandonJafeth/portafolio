export interface Project {
    id: number;
    title: string;
    description: string;
    image: string;
    hoverImage?: string;
    link?: string;
    repo?: string;
    tags?: {
      name: string;
      url: string;
    }[];
  }
  