import React from 'react';
import { CustomSwitchProps } from './Switch.props';
import { Switch as CustomSwitch } from 'react-native-switch';
import { useAppTheme } from '@constants/theme';
import { SwitchContainer } from './Switch.styles';

const Switch: React.FC<CustomSwitchProps> = ({
  onToggle,
  toggle,
  circleIcon,
  ...props
}) => {
  const { colors } = useAppTheme();
  return (
    <SwitchContainer toggle={toggle}>
      <CustomSwitch
        {...props}
        value={toggle}
        onValueChange={onToggle}
        disabled={false}
        circleSize={28}
        barHeight={30}
        circleBorderWidth={2}
        circleBorderActiveColor={colors.blueChaos}
        circleBorderInactiveColor={colors.tarnishedSilver16}
        backgroundActive={colors.blueChaos}
        backgroundInactive={colors.tarnishedSilver16}
        circleActiveColor={colors.white}
        circleInActiveColor={colors.white}
        renderInsideCircle={circleIcon}
        changeValueImmediately={true}
        renderActiveText={false}
        renderInActiveText={false}
        switchWidthMultiplier={2}
        switchBorderRadius={18}
      />
    </SwitchContainer>
  );
};

export default Switch;
