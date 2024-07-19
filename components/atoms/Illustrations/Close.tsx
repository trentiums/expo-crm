import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const CloseIcon = ({ color, height, width, ...props }: SvgProps) => (
  <Svg width={width || 24} height={height || 24} fill="none" {...props}>
    <Path
      fill={color || '#969A99'}
      d="M12.778 12.005 17.84 6.96a.55.55 0 0 0 0-.773.54.54 0 0 0-.767-.015l-5.063 5.047L7.012 6.17a.54.54 0 0 0-.788 0 .543.543 0 0 0 0 .73l4.998 5.039-5.063 5.039a.55.55 0 0 0 0 .773c.1.104.239.162.383.16a.554.554 0 0 0 .405-.13l5.064-5.047 5.064 5.105c.1.104.239.162.383.16a.533.533 0 0 0 .383-.16.55.55 0 0 0 0-.773l-5.063-5.062Z"
    />
  </Svg>
);
export default CloseIcon;
