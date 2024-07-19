import * as React from 'react';
import Svg, { SvgProps, G, Path } from 'react-native-svg';
const Trash = ({ color, ...props }: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <G fill={color || "#fff"}>
      <Path d="M18.79 7a.79.79 0 0 0-.79.79v8.84A3.37 3.37 0 0 1 14.63 20H8.95a3.37 3.37 0 0 1-3.37-3.37V7.79a.79.79 0 1 0-1.58 0v8.84a5 5 0 0 0 5 4.95h5.68a5 5 0 0 0 4.95-4.95V7.79a.79.79 0 0 0-.84-.79Z" />
      <Path
        fillRule="evenodd"
        d="M18.79 5.58h-14a.79.79 0 1 1 0-1.58h2.65l1.18-1.28A2.41 2.41 0 0 1 10.33 2h2.92a2.39 2.39 0 0 1 1.69.7l1.2 1.3h2.65a.79.79 0 1 1 0 1.58Zm-5.54-2h-2.92a.8.8 0 0 0-.54.21l-.19.2h4.38l-.19-.2a.78.78 0 0 0-.54-.21Z"
        clipRule="evenodd"
      />
      <Path d="M8.04 8.79v3a.75.75 0 0 0 1.5 0v-3a.75.75 0 0 0-1.5 0ZM11.04 8.79v8a.75.75 0 0 0 1.5 0v-8a.75.75 0 0 0-1.5 0ZM14.04 8.79v3a.75.75 0 0 0 1.5 0v-3a.75.75 0 0 0-1.5 0Z" />
    </G>
  </Svg>
);
export default Trash;
