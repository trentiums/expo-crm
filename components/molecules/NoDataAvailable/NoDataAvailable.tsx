import React from 'react';
import {
  NoDataContainer,
  NoDataDesc,
  NoDataImage,
  NoDataText,
} from './NoDataAvailable.styles';
import { NoDataProps } from './NoDataAvailable.props';
import NoDataIcon from '@atoms/Illustrations/NoData';
import { Spacer } from '@atoms/common/common.styles';

const NoData: React.FC<NoDataProps> = ({ text, description }) => {
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

export default NoData;
