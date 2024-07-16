import React, { memo, useMemo } from "react";
import { Text as LabelComp } from "react-native-paper";
import { LabelProps } from "./Text.props";
import { useAppTheme } from "@constants/theme";

const Text: React.FC<LabelProps> = memo((props) => {
  const { color, style, children, variant, ...rest } = props;
  const { fonts } = useAppTheme();
  const textStyle = useMemo(() => {
    const _style = [style];
    if (color) {
      _style.push({ color });
    }
    return _style;
  }, [style, fonts, color]);

  return (
    <LabelComp style={textStyle} {...rest}>
      {children}
    </LabelComp>
  );
});

export default Text;
