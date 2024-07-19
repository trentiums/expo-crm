import React, { memo, useMemo } from 'react';
import { StyleProp, View as CustomView, ViewStyle } from 'react-native';
import { ViewProps } from './View.props';

const View: React.FC<ViewProps> = memo(({ children, style, ...rest }) => {
  const { row, justifyCenter, alignCenter, flex } = rest;

  const viewStyle: StyleProp<ViewStyle> = useMemo(() => {
    const _style = [style];
    if (row) {
      _style.push({ flexDirection: 'row' });
    }
    if (justifyCenter) {
      _style.push({ justifyContent: 'center' });
    }
    if (alignCenter) {
      _style.push({ alignItems: 'center' });
    }
    if (flex) {
      _style.push({ flex: 1 });
    }
    return _style;
  }, [row, style, justifyCenter, alignCenter, flex]);

  return (
    <CustomView {...rest} style={viewStyle}>
      {children}
    </CustomView>
  );
});

export default View;
