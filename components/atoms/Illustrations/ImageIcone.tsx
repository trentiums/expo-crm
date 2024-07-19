import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const ImageIcon = ({ color, ...props }: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill={color || '#fff'}
    fillRule="evenodd"
    clipRule="evenodd"
    {...props}>
    <Path d="M24 22H0V2h24v20zM23 3H1v18h22V3zm-1 16H3l4-7.492 3 3.048L15.013 7 22 19zm-11.848-2.865-2.91-2.956L4.668 18h15.593l-5.303-9.108-4.806 7.243zM5.5 5a2.5 2.5 0 0 1 0 5 2.5 2.5 0 0 1 0-5zm0 1a1.5 1.5 0 1 1-.001 3.001A1.5 1.5 0 0 1 5.5 6z" />
  </Svg>
);
export default ImageIcon;
