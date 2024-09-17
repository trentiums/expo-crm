import React from 'react';
import NoDataIcon from '@atoms/Illustrations/NoData';
import { Spacer } from '@atoms/common/common.styles';
import {
  NoDataContainer,
  NoDataDesc,
  NoDataText,
} from './NoDataAvailable.styles';
import { NoDataProps } from './NoDataAvailable.props';

const NoDataAvailable: React.FC<NoDataProps> = ({ text, description }) => {
  return (
    <NoDataContainer>
      <NoDataIcon />
      <Spacer size={12} />
      <NoDataText>{text}</NoDataText>
      <Spacer size={6} />
      <NoDataDesc>{description}</NoDataDesc>
    </NoDataContainer>
  );
};

export default NoDataAvailable;
