import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const EyeOpenIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      fill="#969A99"
      fillRule="evenodd"
      d="m17.028 7.65 4.18 3.34a1.14 1.14 0 0 1 0 1.78l-4.18 3.34a7.55 7.55 0 0 1-9.42 0l-4.18-3.34a1.14 1.14 0 0 1 0-1.78l4.18-3.34a7.55 7.55 0 0 1 9.42 0Zm-7.01 4.23a2.3 2.3 0 1 0 4.6 0 2.3 2.3 0 0 0-4.6 0Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default EyeOpenIcon;
