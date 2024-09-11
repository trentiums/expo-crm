import React from 'react';
import { NoDataContainer, NoDataImage, NoDataText } from './NoData.styles';
import { NoDataProps } from './NoData.props';

const NoData: React.FC<NoDataProps> = ({ image, text }) => {
  return (
    <NoDataContainer>
      {image && <NoDataImage source={image} />}
      <NoDataText>{text}</NoDataText>
    </NoDataContainer>
  );
};

export default NoData;
