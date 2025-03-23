
// components/icons/index.ts

import C from "@/components/Icons/C";
import CSSIcon from "@/components/Icons/CSSIcon";
import HTML5Icon from "@/components/Icons/HTML5Icon";
import JavaScript from "@/components/Icons/JavaScript";
import Motion from "@/components/Icons/Motion";
import MySQL from "@/components/Icons/MySQL";
import NestJS from "@/components/Icons/NestJS";
import Nextjs from "@/components/Icons/Nextjs";
import Nodejs from "@/components/Icons/Nodejs";
import ReactIcon from "@/components/Icons/ReactIcon";
import ReactQuery from "@/components/Icons/ReactQuery";
import Tailwind from "@/components/Icons/Tailwind";
import TypeScript from "@/components/Icons/TypeScript";
import Zod from "@/components/Icons/Zod";


// Ajusta estos nombres al texto que aparece en tu JSON
export const skillIcons: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  "JavaScript": JavaScript,
  "Framer Motion": Motion,
  "Next.js": Nextjs,
  "React Query": ReactQuery,
  "TypeScript": TypeScript,
  "Zod": Zod,
  "React": ReactIcon,
  "Tailwind CSS": Tailwind,
  "HTML5": HTML5Icon,
  "CSS3": CSSIcon,
  "NestJS": NestJS,
  "Node.js": Nodejs,
  "C#" : C,
  "MySQL" : MySQL,
};
