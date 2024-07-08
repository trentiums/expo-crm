import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const AddIcon = (props: SvgProps) => (
  <Svg width={25} height={25} fill="none" {...props}>
    <Path
      fill="#41C47E"
      fillRule="evenodd"
      d="M11.512 2.4h1.12a9.44 9.44 0 0 1 9.44 9.44v1.12a9.44 9.44 0 0 1-9.44 9.44h-1.12a9.44 9.44 0 0 1-9.44-9.44v-1.12a9.44 9.44 0 0 1 9.44-9.44Zm1.31 10.75h3.25a.75.75 0 0 0 0-1.5h-3.25V8.4a.75.75 0 0 0-1.5 0v3.25h-3.25a.75.75 0 0 0 0 1.5h3.25v3.25a.75.75 0 0 0 1.5 0v-3.25Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default AddIcon;
