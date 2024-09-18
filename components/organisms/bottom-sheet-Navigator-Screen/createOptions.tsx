import React, { useCallback, useEffect } from 'react';
import CreateOptionsItem from '@molecules/CreateOptionItem/CreateOptionItem';
import { CreateOptionContainer, CreateOptionsFlatList } from './screen.style';
import SingleUserIcon from '@atoms/Illustrations/SingleUser';
import LeadDocumentIcon from '@atoms/Illustrations/LeadDocument';
import ServicesComputerIcon from '@atoms/Illustrations/ServicesComputer';
import { CreateOptionItemProps, CreateOptionProps } from './screen.props';
import { useTranslation } from 'react-i18next';
import { router } from 'expo-router';
import { addLeadInformation } from '@redux/slices/leads';
import { useAppDispatch } from '@redux/store';

const CreateOptions: React.FC<CreateOptionProps> = ({
  changeSnapPoints,
  handleBottomSheetClose,
}) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation('bottomSheetCreatePotion');
  const onLayout = useCallback(() => {
    changeSnapPoints(['20%', '90%']);
  }, []);

  const createOptions = [
    {
      label: 'user',
      icon: <SingleUserIcon />,
      route: '../../(protected)/add-user/add',
    },
    {
      label: 'lead',
      icon: <LeadDocumentIcon />,
      route: '../../(protected)/add-lead/addLead',
    },
    {
      label: 'service',
      icon: <ServicesComputerIcon />,
      route: '../../(protected)/add-product/add',
    },
  ];

  const handleRedirection = (route: string) => {
    handleBottomSheetClose?.();
    router.navigate(route);
  };

  const renderCreateOption = ({
    item,
    index,
  }: {
    item: CreateOptionItemProps;
    index: number;
  }) => {
    return (
      <CreateOptionsItem
        handlePress={() => handleRedirection(item.route)}
        icon={item.icon}
        label={t(`${item.label}`)}
        key={`${item.label}-${index}`}
      />
    );
  };
  useEffect(() => {
    dispatch(addLeadInformation({}));
  }, []);
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
