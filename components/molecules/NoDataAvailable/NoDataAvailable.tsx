import React from 'react';
import {
  NoDataContainer,
  NoDataImage,
  NoDataText,
} from './NoDataAvailable.styles';
import { NoDataProps } from './NoDataAvailable.props';

const NoData: React.FC<NoDataProps> = ({ image, text }) => {
  return (
    <NoDataContainer>
      {image && <NoDataImage source={image} />}
      <NoDataText>{text}</NoDataText>
    </NoDataContainer>
  );
};

export default NoData;
