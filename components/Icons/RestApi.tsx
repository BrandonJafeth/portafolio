import * as React from "react";
import type { SVGProps } from "react";
const RestApi = (props: SVGProps<SVGSVGElement>) => (
   <svg
     xmlns="http://www.w3.org/2000/svg"
     viewBox="0 0 24 24"
     strokeWidth="2"
     stroke="currentColor"
     fill="none"
     strokeLinecap="round"
     strokeLinejoin="round"
     width="1em"
     height="1em"
     {...props}
   >
     <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
     <path d="M4 13h5" />
     <path d="M12 16v-8" />
     <path d="M15 13h5" />
     <path d="M12 15a3 3 0 0 1 -3 -3a3 3 0 0 1 3 -3a3 3 0 0 1 3 3a3 3 0 0 1 -3 3z" />
   </svg>
);
export default RestApi;
