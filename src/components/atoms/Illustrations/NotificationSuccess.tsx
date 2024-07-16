import * as React from 'react';
import Svg, {
  SvgProps,
  Circle,
  Path,
  Defs,
  LinearGradient,
  Stop,
} from 'react-native-svg';
const NotificationSuccess = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Circle cx={12} cy={12} r={12} fill="url(#a)" />
    <Path
      fill="#121212"
      d="M9.964 16.156a1 1 0 0 1-.633-.226l-2.987-2.447a1 1 0 0 1 1.267-1.547l2.313 1.894 6.667-6.14a1 1 0 1 1 1.333 1.466l-7.28 6.734a.987.987 0 0 1-.68.266Z"
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={0}
        x2={24}
        y1={6.968}
        y2={24}
        gradientUnits="userSpaceOnUse">
        <Stop stopColor="#16CA9F" />
        <Stop offset={1} stopColor="#1DC771" />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default NotificationSuccess;
