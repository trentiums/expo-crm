import View from '@atoms/View/View';
import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

function ProductServices({ color, ...props }: SvgProps) {
  return (
    <Svg height={24} id="icon" viewBox="0 0 32 32" width={24} {...props}>
      <Path
        d="M29 25h-2v-2h1v-4h-4v1h-2v-2a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1z"
        fill={color}
      />
      <Path
        d="M24 30h-6a1 1 0 01-1-1v-6a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1zm-5-2h4v-4h-4zM15 19.858A3.993 3.993 0 1120 16h2a6 6 0 10-7 5.91z"
        fill={color}
      />
      <Path
        d="M28.89 13.55l-2.31 2.03-1.42-1.42 2.41-2.12-2.36-4.08-3.44 1.16a9.368 9.368 0 00-2.7-1.57L18.36 4h-4.72l-.71 3.55a8.86 8.86 0 00-2.71 1.57L6.79 7.96l-2.36 4.08 2.72 2.39a8.895 8.895 0 000 3.13l-2.72 2.4 2.36 4.08 3.44-1.16a9.368 9.368 0 002.7 1.57l.71 3.55H15v2h-1.36a2 2 0 01-1.96-1.61l-.51-2.52a11.412 11.412 0 01-1.31-.75l-2.43.82a2.038 2.038 0 01-.64.1 1.973 1.973 0 01-1.73-1L2.7 20.96a2 2 0 01.41-2.51l1.92-1.68C5.01 16.51 5 16.26 5 16s.02-.51.04-.76l-1.93-1.69a2 2 0 01-.41-2.51l2.36-4.08a1.973 1.973 0 011.73-1 2.038 2.038 0 01.64.1l2.42.82a11.542 11.542 0 011.32-.75l.51-2.52A2 2 0 0113.64 2h4.72a2 2 0 011.96 1.61l.51 2.52a11.412 11.412 0 011.31.75l2.43-.82a2.038 2.038 0 01.64-.1 1.973 1.973 0 011.73 1l2.36 4.08a2 2 0 01-.41 2.51z"
        fill={color}
      />
      <Path
        data-name="&lt;Transparent Rectangle&gt;"
        id="_Transparent_Rectangle_"
        d="M0 0H32V32H0z"
        fill="none"
      />
    </Svg>
  );
}

export default ProductServices;
