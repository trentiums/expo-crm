import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const MailIcon = ({ color, ...props }: SvgProps) => (
  <Svg width={16} height={16} {...props}>
    <Path
      d="M4 2.668h8a2.666 2.666 0 0 1 2.668 2.664v6A2.669 2.669 0 0 1 12 14H4a2.669 2.669 0 0 1-2.668-2.668v-6A2.666 2.666 0 0 1 4 2.668Zm4.934 6.367 4.226-3.137a.424.424 0 0 0 .094-.59.402.402 0 0 0-.277-.167.396.396 0 0 0-.309.078L8.395 8.332a.571.571 0 0 1-.41.176.558.558 0 0 1-.41-.176L3.331 5.219a.394.394 0 0 0-.309-.074.412.412 0 0 0-.27.164.42.42 0 0 0 .087.59L7.04 9c.26.246.605.387.968.395.344 0 .672-.13.926-.36Zm0 0"
      style={{
        stroke: 'none',
        fillRule: 'evenodd',
        fill: color || '#969a99',
        fillOpacity: 1,
      }}
    />
  </Svg>
);
export default MailIcon;
