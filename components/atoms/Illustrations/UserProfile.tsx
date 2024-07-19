import * as React from 'react';
import Svg, { SvgProps, G, Path, Defs, ClipPath } from 'react-native-svg';
const UserProfile = ({ color, ...props }: SvgProps) => (
  <Svg width={110} height={110} fill="none" viewBox="0 0 24 24" {...props}>
    <G clipPath="url(#a)">
      <Path fill="#ffffff00" d="M0 0h24v24H0z" />
      <G filter="url(#b)">
        <Path
          fill={color || '#ffffff'}
          d="m14.336 12.347-.26-.428a.5.5 0 0 0 .115.906l.145-.478Zm-4.673 0 .146.478a.5.5 0 0 0 .114-.905l-.26.427Zm-5.601 6.655-.497-.062.497.062Zm15.876 0 .497-.062-.497.062ZM16 8.5c0 1.448-.77 2.717-1.924 3.42l.52.854A4.997 4.997 0 0 0 17 8.5h-1Zm-4-4a4 4 0 0 1 4 4h1a5 5 0 0 0-5-5v1Zm-4 4a4 4 0 0 1 4-4v-1a5 5 0 0 0-5 5h1Zm1.923 3.42A3.997 3.997 0 0 1 8 8.5H7c0 1.811.963 3.397 2.403 4.274l.52-.854Zm-.405-.052a8.509 8.509 0 0 0-5.953 7.072l.993.124a7.508 7.508 0 0 1 5.251-6.24l-.291-.956ZM3.565 18.94c-.11.888.626 1.56 1.435 1.56v-1c-.295 0-.468-.228-.442-.436l-.993-.124ZM5 20.5h14v-1H5v1Zm14 0c.81 0 1.545-.672 1.434-1.56l-.992.124c.026.208-.147.436-.442.436v1Zm1.434-1.56a8.509 8.509 0 0 0-5.952-7.072l-.291.957a7.508 7.508 0 0 1 5.251 6.239l.992-.124Z"
        />
      </G>
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#ffffff" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default UserProfile;
