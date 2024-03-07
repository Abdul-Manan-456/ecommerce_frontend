import React, { SVGProps } from "react";

export function AddPhoto(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M3 21V3h11v2H5v14h14v-9h2v11zM17 9V7h-2V5h2V3h2v2h2v2h-2v2zM6 17h12l-3.75-5l-3 4L9 13zm-1-6v8V5z"
      ></path>
    </svg>
  );
}
export default AddPhoto;
