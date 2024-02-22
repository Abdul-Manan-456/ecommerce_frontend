import React, { SVGProps } from 'react'

export function Currency(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M15.308 15.692h3.384v-3.384h-.884v2.5h-2.5zM12 14.385q.98 0 1.683-.702q.702-.702.702-1.683q0-.98-.702-1.683q-.702-.702-1.683-.702q-.98 0-1.683.702q-.702.702-.702 1.683q0 .98.702 1.683q.702.702 1.683.702m-6.692-2.693h.884v-2.5h2.5v-.884H5.308zM3 18V6h18v12zm1-1h16V7H4zm0 0V7z"></path></svg>
  )
}
export default Currency