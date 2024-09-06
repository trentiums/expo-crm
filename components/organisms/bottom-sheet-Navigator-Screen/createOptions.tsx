import React, { useCallback } from 'react';
import CreateOptionsItem from '@molecules/BSCreateOptionItem/BSCreateOptionItem';
import { CreateOptionContainer, CreateOptionsFlatList } from './screen.style';
import SingleUser from '@atoms/Illustrations/SingleUser';
import LeadDocument from '@atoms/Illustrations/LeadDocument';
import ServicesComputer from '@atoms/Illustrations/ServicesComputer';
import { CreateOptionItemProps, CreateOptionProps } from './screen.props';

import { useTranslation } from 'react-i18next';
import { router } from 'expo-router';

const CreateOptions: React.FC<CreateOptionProps> = ({ changeSnapPoints }) => {
  const { t } = useTranslation();
  const onLayout = useCallback(() => {
    changeSnapPoints(['20%', '90%']);
  }, []);

  const createOptions = [
    {
      label: 'user',
      icon: <SingleUser />,
      route: '../../(protected)/add-user/add',
    },
    {
      label: 'lead',
      icon: <LeadDocument />,
      route: '../../(protected)/add-lead/addLead',
    },
    {
      label: 'service',
      icon: <ServicesComputer />,
      route: '../../(protected)/add-product/add',
    },
  ];

  const renderCreateOption = ({
    item,
    index,
  }: {
    item: CreateOptionItemProps;
    index: number;
  }) => {
    return (
      <CreateOptionsItem
        handlePress={() => router.navigate(item.route)}
        icon={item.icon}
        label={t(`${item.label}`)}
        key={`${item.label}-${index}`}
      />
    );
  };
  return (
    <CreateOptionContainer onLayout={onLayout}>
      <CreateOptionsFlatList
        data={createOptions}
        keyExtractor={(item: CreateOptionItemProps, index: number) =>
          `${item.label}-${index}`
        }
        renderItem={renderCreateOption}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
    </CreateOptionContainer>
  );
};

export default CreateOptions;
