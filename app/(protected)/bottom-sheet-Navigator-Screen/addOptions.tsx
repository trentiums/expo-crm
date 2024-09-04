import React from 'react';
import AddOptionsItem from '@molecules/BSAddOptionItem/BSAddOptionItem';
import { AddOptionContainer } from './screen.style';
import SingleUser from '@atoms/Illustrations/SingleUser';
import LeadDocument from '@atoms/Illustrations/LeadDocument';
import ServicesComputer from '@atoms/Illustrations/ServicesComputer';

const AddOptions = ({ navigation }) => {
  return (
    <AddOptionContainer>
      <AddOptionsItem
        handlePress={() => console.log('first')}
        icon={<SingleUser />}
        label="User"
      />
      <AddOptionsItem
        handlePress={() => console.log('first')}
        icon={<LeadDocument />}
        label="Lead"
      />
      <AddOptionsItem
        handlePress={() => console.log('first')}
        icon={<ServicesComputer />}
        label="Service"
      />
    </AddOptionContainer>
  );
};

export default AddOptions;
