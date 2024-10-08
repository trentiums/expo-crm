import * as React from 'react';
import Svg, { Circle, Mask, Rect, G, Path, SvgProps } from 'react-native-svg';
const Service = (props: SvgProps) => (
  <Svg width={40} height={40} viewBox="0 0 40 40" fill="none" {...props}>
    <Circle cx={20} cy={20} r={20} fill="#E1E1E1" />
    <Mask
      id="mask0_149_958"
      style={{
        maskType: 'alpha',
      }}
      maskUnits="userSpaceOnUse"
      x={8}
      y={8}
      width={24}
      height={24}>
      <Rect x={8.5} y={8.5} width={23} height={23} fill="#A3A3A3" />
    </Mask>
    <G mask="url(#mask0_149_958)">
      <Path
        d="M10.2844 28.9058C10.0013 28.9058 9.76319 28.8091 9.56993 28.6159C9.37683 28.4226 9.28027 28.1844 9.28027 27.9014C9.28027 27.6185 9.37683 27.3814 9.56993 27.1901C9.76319 26.9987 10.0013 26.9031 10.2844 26.9031H29.7146C29.9976 26.9031 30.2358 26.9987 30.429 27.1901C30.6221 27.3814 30.7187 27.6185 30.7187 27.9014C30.7187 28.1844 30.6221 28.4226 30.429 28.6159C30.2358 28.8091 29.9976 28.9058 29.7146 28.9058H10.2844ZM12.4016 25.9447C11.7981 25.9447 11.2839 25.7322 10.8589 25.3072C10.4339 24.8822 10.2214 24.368 10.2214 23.7645V13.3604C10.2214 12.757 10.4339 12.2427 10.8589 11.8177C11.2839 11.3927 11.7981 11.1802 12.4016 11.1802H27.5974C28.2008 11.1802 28.715 11.3927 29.1401 11.8177C29.5651 12.2427 29.7776 12.757 29.7776 13.3604V23.7645C29.7776 24.368 29.5651 24.8822 29.1401 25.3072C28.715 25.7322 28.2008 25.9447 27.5974 25.9447H12.4016Z"
        fill="#A3A3A3"
      />
    </G>
  </Svg>
);
export default Service;
