import React, { useCallback } from 'react';
import AddOptionsItem from '@molecules/BSAddOptionItem/BSAddOptionItem';
import { AddOptionContainer, AddOptionFlatListCon } from './screen.style';
import SingleUser from '@atoms/Illustrations/SingleUser';
import LeadDocument from '@atoms/Illustrations/LeadDocument';
import ServicesComputer from '@atoms/Illustrations/ServicesComputer';
import { AddOptionItemProps, AddOptionProps } from './screen.props';

import { useTranslation } from 'react-i18next';
import { router } from 'expo-router';

const AddOptions: React.FC<AddOptionProps> = ({ setSnapPoints }) => {
  const { t } = useTranslation();
  const onLayout = useCallback(() => {
    setSnapPoints(['20%', '90%']);
  }, []);

  const addOptionList = [
    {
      label: 'user',
      icon: <SingleUser />,
      navigationScreen: '../../(protected)/add-user/add',
    },
    {
      label: 'lead',
      icon: <LeadDocument />,
      navigationScreen: '../../(protected)/add-lead/addLead',
    },
    {
      label: 'service',
      icon: <ServicesComputer />,
      navigationScreen: '../../(protected)/add-product/add',
    },
  ];

  const renderAddOption = ({
    item,
    index,
  }: {
    item: AddOptionItemProps;
    index: number;
  }) => {
    return (
      <AddOptionsItem
        handlePress={() => router.navigate(item.navigationScreen)}
        icon={item.icon}
        label={t(`${item.label}`)}
      />
    );
  };
  return (
    <AddOptionContainer onLayout={onLayout}>
      <AddOptionFlatListCon
        data={addOptionList}
        keyExtractor={(item: AddOptionItemProps, index: number) =>
          `${item.label}-${index}`
        }
        renderItem={renderAddOption}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
    </AddOptionContainer>
  );
};

export default AddOptions;
