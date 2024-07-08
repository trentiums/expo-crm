import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const EmailIcon = ({ color, ...props }: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      fill={color}
      fillRule="evenodd"
      d="M6 4h12a4 4 0 0 1 4 4v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4Zm7.4 9.55 6.34-4.7a.64.64 0 0 0 .14-.89.62.62 0 0 0-.88-.13l-6.41 4.67a.85.85 0 0 1-1.23 0L5 7.83a.62.62 0 0 0-.87.13.64.64 0 0 0 .13.89l6.3 4.65c.392.372.91.582 1.45.59a2.06 2.06 0 0 0 1.39-.54Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default EmailIcon;
