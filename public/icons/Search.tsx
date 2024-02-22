import React, { forwardRef, SVGProps } from 'react';

const Search = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>((props, ref) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" ref={ref} {...props}>
    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="m21 21l-6-6m2-5a7 7 0 1 1-14 0a7 7 0 0 1 14 0"></path>
  </svg>
));

Search.displayName = 'Search';
export default Search;
