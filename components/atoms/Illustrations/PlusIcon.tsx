import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const PlusIcon = ({ color, ...props }: SvgProps) => (
  <Svg width={16} height={16} {...props}>
    <Path
      d="M7.625 1.332h.75a6.297 6.297 0 0 1 6.293 6.293v.75a6.297 6.297 0 0 1-6.293 6.293h-.75a6.297 6.297 0 0 1-6.293-6.293v-.75a6.297 6.297 0 0 1 6.293-6.293Zm.75 12.336a5.335 5.335 0 0 0 5.293-5.293v-.75a5.335 5.335 0 0 0-5.293-5.293h-.75a5.335 5.335 0 0 0-5.293 5.293v.75a5.335 5.335 0 0 0 5.293 5.293Zm0 0"
      style={{
        stroke: 'none',
        fillRule: 'evenodd',
        fill: color || '#969a99',
        fillOpacity: 1,
      }}
    />
    <Path
      d="M10.668 7.5H8.5V5.332a.501.501 0 0 0-1 0V7.5H5.332a.501.501 0 0 0 0 1H7.5v2.168a.501.501 0 0 0 1 0V8.5h2.168a.501.501 0 0 0 0-1Zm0 0"
      style={{
        stroke: 'none',
        fillRule: 'nonzero',
        fill: color || '#969a99',
        fillOpacity: 1,
      }}
    />
  </Svg>
);
export default PlusIcon;
