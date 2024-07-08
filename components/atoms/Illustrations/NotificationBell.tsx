import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const NotificationBell = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      fill="#fff"
      fillRule="evenodd"
      d="M20.407 13.97a2 2 0 0 0 .7 1.51c1.51 1.35.44 3.66-1.7 3.66h-3.8a3.43 3.43 0 0 1-3.2 2.25 3.38 3.38 0 0 1-3.2-2.25h-3.8c-2.14 0-3.21-2.31-1.7-3.66a2 2 0 0 0 .7-1.51V9.14c0-3.94 3.58-7.14 8-7.14s8 3.2 8 7.14v4.83Zm-9.52 5.17a1.93 1.93 0 0 0 1.52.75 1.93 1.93 0 0 0 1.48-.75h-3Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default NotificationBell;
