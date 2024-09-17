import * as React from 'react';
import Svg, { Mask, Rect, G, Path, SvgProps } from 'react-native-svg';
const AssignedToIcon = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Mask
      id="mask0_73_186"
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
    <G mask="url(#mask0_73_186)">
      <Path
        d="M5.07187 21.2031C4.44221 21.2031 3.90562 20.9814 3.46212 20.5379C3.01862 20.0944 2.79688 19.5578 2.79688 18.9281V5.07163C2.79688 4.44196 3.01862 3.90538 3.46212 3.46188C3.90562 3.01838 4.44221 2.79663 5.07187 2.79663H9.07463C9.33579 2.19263 9.72638 1.7083 10.2464 1.34363C10.7662 0.978964 11.3508 0.796631 12.0001 0.796631C12.6495 0.796631 13.234 0.978964 13.7539 1.34363C14.2739 1.7083 14.6645 2.19263 14.9256 2.79663H18.9284C19.558 2.79663 20.0946 3.01838 20.5381 3.46188C20.9816 3.90538 21.2034 4.44196 21.2034 5.07163V18.9281C21.2034 19.5578 20.9816 20.0944 20.5381 20.5379C20.0946 20.9814 19.558 21.2031 18.9284 21.2031H5.07187ZM12.0001 4.29763C12.2328 4.29763 12.4239 4.2228 12.5734 4.07313C12.723 3.92363 12.7979 3.73255 12.7979 3.49988C12.7979 3.26721 12.723 3.07613 12.5734 2.92663C12.4239 2.77696 12.2328 2.70213 12.0001 2.70213C11.7675 2.70213 11.5764 2.77696 11.4269 2.92663C11.2772 3.07613 11.2024 3.26721 11.2024 3.49988C11.2024 3.73255 11.2772 3.92363 11.4269 4.07313C11.5764 4.2228 11.7675 4.29763 12.0001 4.29763ZM12.0001 13.1194C12.9828 13.1194 13.8197 12.7737 14.5109 12.0824C15.2022 11.3912 15.5479 10.5543 15.5479 9.57163C15.5479 8.58896 15.2022 7.75296 14.5109 7.06363C13.8197 6.37446 12.9828 6.02988 12.0001 6.02988C11.0175 6.02988 10.1805 6.37446 9.48938 7.06363C8.79804 7.75296 8.45237 8.58896 8.45237 9.57163C8.45237 10.5543 8.79804 11.3912 9.48938 12.0824C10.1805 12.7737 11.0175 13.1194 12.0001 13.1194ZM5.07187 18.9281H18.9284V17.6466C18.0284 16.7833 16.9945 16.1084 15.8269 15.6219C14.659 15.1355 13.3835 14.8924 12.0001 14.8924C10.6168 14.8924 9.34121 15.1375 8.17338 15.6279C7.00571 16.1182 5.97187 16.7951 5.07187 17.6586V18.9281Z"
        fill="#A8ACB3"
      />
    </G>
  </Svg>
);
export default AssignedToIcon;
