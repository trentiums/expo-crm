import * as React from 'react';
import Svg, { Mask, Rect, G, Path } from 'react-native-svg';
const ChannelIcon = (props) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Mask
      id="mask0_73_172"
      style={{
        maskType: 'alpha',
      }}
      maskUnits="userSpaceOnUse"
      x={0}
      y={0}
      width={24}
      height={24}>
      <Rect width={24} height={24} fill="#D9D9D9" />
    </Mask>
    <G mask="url(#mask0_73_172)">
      <Path
        d="M7.42838 20.2031C6.42537 20.2031 5.56938 19.8487 4.86038 19.1399C4.15138 18.4309 3.79687 17.575 3.79687 16.5721C3.79687 15.5693 4.15138 14.7132 4.86038 14.0039C5.56938 13.2947 6.42537 12.9401 7.42838 12.9401H18.5719C19.5749 12.9401 20.4309 13.2945 21.1399 14.0034C21.8489 14.7124 22.2034 15.5683 22.2034 16.5711C22.2034 17.574 21.8489 18.43 21.1399 19.1394C20.4309 19.8485 19.5749 20.2031 18.5719 20.2031H7.42838ZM5.42838 11.0596C4.42538 11.0596 3.56938 10.7052 2.86038 9.99638C2.15137 9.28738 1.79688 8.43146 1.79688 7.42863C1.79688 6.4258 2.15137 5.56971 2.86038 4.86038C3.56938 4.15121 4.42538 3.79663 5.42838 3.79663H16.5779C17.5792 3.79663 18.4338 4.15105 19.1416 4.85988C19.8495 5.56888 20.2034 6.4248 20.2034 7.42763C20.2034 8.43046 19.8495 9.28655 19.1416 9.99588C18.4338 10.705 17.5792 11.0596 16.5779 11.0596H5.42838Z"
        fill="#A8ACB3"
      />
    </G>
  </Svg>
);
export default ChannelIcon;
