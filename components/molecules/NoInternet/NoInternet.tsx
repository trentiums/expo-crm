import Text from '@atoms/Text/Text';
import React from 'react';
import { Container } from './NoInternet.styles';

const NoInternet = () => {
  return (
    <Container>
      <Text>No Internet Connection!</Text>
    </Container>
  );
};

export default NoInternet;
