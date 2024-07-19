import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const CrossIcon = ({ color, ...props }: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      fill={color}
      d="M17.79 16.793 12.993 12l4.795-4.757a.71.71 0 0 0-.03-.959.698.698 0 0 0-.951-.043l-4.81 4.722-4.725-4.758a.698.698 0 0 0-.989 0 .708.708 0 0 0 0 1.003l4.719 4.75-4.796 4.75a.708.708 0 0 0 .498 1.207.698.698 0 0 0 .49-.197l4.803-4.765 4.81 4.842A.699.699 0 0 0 18 17.293a.708.708 0 0 0-.21-.5Z"
    />
  </Svg>
);
export default CrossIcon;
