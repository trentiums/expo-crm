import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const CheckMarkIcon = ({ color, ...props }: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      fill={color || '#41C47E'}
      d="M8.946 18.235a1.5 1.5 0 0 1-.95-.34l-4.48-3.67a1.5 1.5 0 0 1 1.9-2.32l3.47 2.84 10-9.21a1.5 1.5 0 1 1 2 2.2l-10.92 10.1a1.48 1.48 0 0 1-1.02.4Z"
    />
  </Svg>
);
export default CheckMarkIcon;
