import React from 'react';
import {
  StepList,
  StepInfo,
  StepText,
  Separator,
  StepInfoContainer,
} from './Stepper.styles';
import { StepperProps } from './Stepper.props';
import CheckCircle from '@atoms/Illustrations/CheckCircle';
import NextStep from '@atoms/Illustrations/NextStep';
import CurrentStep from '@atoms/Illustrations/CurrentStep';
import { Spacer } from '@atoms/common/common.styles';

const Stepper: React.FC<StepperProps> = ({
  stepData,
  currentId,
  setSelectedTabNav,
}) => {
  const renderIcon = (itemId: number) => {
    if (currentId === itemId) {
      return <CurrentStep />;
    } else if (currentId < itemId) {
      return <NextStep />;
    } else {
      return <CheckCircle />;
    }
  };
  const renderStep = ({ item, index }) => (
    <StepInfoContainer onPress={() => setSelectedTabNav?.(item.name)}>
      <StepInfo>
        {renderIcon(item.id)}
        <Spacer size={4} />
        <StepText
          isCurrentStep={currentId === item.id}
          variant={`${
            currentId === item.id
              ? 'SF-Pro-Display-Medium_500'
              : 'SF-Pro-Display-Regular_400'
          }`}>
          {item.title}
        </StepText>
      </StepInfo>

      {index < stepData.length - 1 && (
        <Separator width={stepData.length * 22} />
      )}
    </StepInfoContainer>
  );

  return (
    <StepList
      data={stepData}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderStep}
    />
  );
};

export default Stepper;
