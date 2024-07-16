import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const EyeCloseIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      fill="#969A99"
      fillRule="evenodd"
      d="M8.469 7.054 5.136 3.723a1 1 0 0 0-1.414 1.414l3.122 3.122-3.417 2.73a1.14 1.14 0 0 0 0 1.78l4.18 3.34a7.552 7.552 0 0 0 7.988.901l3.398 3.398a1 1 0 0 0 1.414-1.414l-3.105-3.105-2.946-2.946-3.103-3.103L8.47 7.053Zm10.774 7.285 1.965-1.57a1.14 1.14 0 0 0 0-1.78l-4.18-3.34a7.546 7.546 0 0 0-6.011-1.536l8.226 8.226Zm-9.225-2.46c0-.14.012-.277.036-.41l2.674 2.674a2.3 2.3 0 0 1-2.71-2.263Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default EyeCloseIcon;
