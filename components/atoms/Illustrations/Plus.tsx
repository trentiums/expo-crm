import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const Plus = ({ color, ...props }: SvgProps) => (
  <Svg width={28} height={28} fill={color} {...props} viewBox="0 0 28 28">
    <Path d="M28 14H18V4a2 2 0 0 0-4 0v10H4a2 2 0 0 0 0 4h10v10a2 2 0 0 0 4 0V18h10a2 2 0 0 0 0-4z" />
  </Svg>
);
export default Plus;
