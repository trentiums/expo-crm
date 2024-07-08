import React from 'react';
import {
  Container,
  FlatListContainer,
  Flexed,
  ListContainer,
  ShowLeadText,
} from './LeadDetailsList.styles';
import { LeadDetailsListProps } from './LeadDetailsList.props';

const LeadDetailsList: React.FC<LeadDetailsListProps> = ({ LeadDetails }) => {
  return (
    <Container>
      <Flexed>
        <ListContainer>
          {LeadDetails?.map((item, index) => {
            return (
              <FlatListContainer key={`${index}`}>
                <ShowLeadText>{item}</ShowLeadText>
              </FlatListContainer>
            );
          })}
        </ListContainer>
      </Flexed>
    </Container>
  );
};

export default LeadDetailsList;
