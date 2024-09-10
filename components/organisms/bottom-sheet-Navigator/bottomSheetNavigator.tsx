import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Pressable } from 'react-native';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import BottomSheetCreateOption from '../bottom-sheet-Navigator-Screen/createOptions';
import ModifyLeadOption from '../bottom-sheet-Navigator-Screen/modifyLeadOption';
import {
  BottomSheetHeaderContainer,
  BottomSheetHeaderTitle,
} from './bottomSheetNavigator.style';
import { useTranslation } from 'react-i18next';
import {
  BottomSheetHeaderProps,
  BottomSheetNavigatorProps,
} from './bottomSheetNavigator.props';
import ArrowLeftIcon from '@atoms/Illustrations/ArrowLeft';
import { useAppTheme } from '@constants/theme';
import BottomSheetCloseIcon from '@atoms/Illustrations/BottomSheetClose';
import LeadsFilter from '@organisms/bottom-sheet-Navigator-Screen/leadsFilter';
import LeadsSortFilter from '@organisms/bottom-sheet-Navigator-Screen/leadsSortFilter';
import DropdownListing from '@organisms/bottom-sheet-Navigator-Screen/dropdownListing';
import AssignedUserList from '@organisms/bottom-sheet-Navigator-Screen/assignedUserList';
import LeadStatusList from '@organisms/bottom-sheet-Navigator-Screen/LeadStatusList';
import LeadStatusChange from '@organisms/bottom-sheet-Navigator-Screen/LeadStatusChange';
import LeadStageList from '@organisms/bottom-sheet-Navigator-Screen/LeadStageList';
import LeadStageCloseWon from '@organisms/bottom-sheet-Navigator-Screen/LeadStageCloseWon';
import LeadStageNegotiation from '@organisms/bottom-sheet-Navigator-Screen/LeadStageNegotiation';

const Stack = createNativeStackNavigator();

const BottomSheetNavigator: React.FC<BottomSheetNavigatorProps> = ({
  initialRouteName,
  onClosePress,
  meta,
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [snapPoints, setSnapPoints] = useState(['50%', '90%']);
  const { colors } = useAppTheme();
  const { t } = useTranslation('bottomSheetNavigator');

  const CustomHeader = ({
    title,
    onClose,
    backVisible,
    onBackPress,
  }: BottomSheetHeaderProps) => (
    <BottomSheetHeaderContainer>
      {backVisible && (
        <Pressable onPress={onBackPress}>
          <ArrowLeftIcon color={colors.black} />
        </Pressable>
      )}
      <BottomSheetHeaderTitle>{title}</BottomSheetHeaderTitle>
      <Pressable onPress={onClose}>
        <BottomSheetCloseIcon />
      </Pressable>
    </BottomSheetHeaderContainer>
  );

  useEffect(() => {
    bottomSheetRef.current?.present();
  });

  const changeSnapPoints = (points: string[]) => {
    setSnapPoints(points);
  };
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
      />
    ),
    [],
  );

  const handleClosePress = () => {
    bottomSheetRef.current?.close();
    onClosePress?.();
  };
  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      index={0}
      backdropComponent={renderBackdrop}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      handleComponent={null}
      onClose={() => handleClosePress()}>
      <NavigationContainer independent={true}>
        <Stack.Navigator initialRouteName={initialRouteName}>
          <Stack.Screen
            name="BottomSheetCreateOption"
            options={() => ({
              header: () => (
                <CustomHeader
                  title={t('ChooseOptionToAdd')}
                  onClose={() => handleClosePress()}
                />
              ),
            })}>
            {(props) => (
              <BottomSheetCreateOption
                {...props}
                changeSnapPoints={changeSnapPoints}
                handleBottomSheetClose={handleClosePress}
              />
            )}
          </Stack.Screen>
          <Stack.Screen
            name="ModifyLeadOption"
            options={() => ({
              header: () => (
                <CustomHeader
                  title={t('chooseOption')}
                  onClose={() => handleClosePress()}
                />
              ),
            })}>
            {(props) => (
              <ModifyLeadOption
                {...props}
                changeSnapPoints={changeSnapPoints}
                handleBottomSheetClose={handleClosePress}
                leadId={meta.leadId}
                optionType={meta.optionType}
              />
            )}
          </Stack.Screen>
          <Stack.Screen
            name="AssignedUserList"
            options={({ navigation }) => ({
              header: () => (
                <CustomHeader
                  title={t('updateAssignedUsers')}
                  onClose={() => handleClosePress()}
                  backVisible={true}
                  onBackPress={() => navigation.goBack()}
                />
              ),
            })}>
            {(props) => (
              <AssignedUserList
                {...props}
                handleBottomSheetClose={handleClosePress}
                leadId={meta.leadId}
              />
            )}
          </Stack.Screen>
          <Stack.Screen
            name="LeadStatusList"
            options={({ navigation }) => ({
              header: () => (
                <CustomHeader
                  title={t('updateStatus')}
                  onClose={() => handleClosePress()}
                  backVisible={true}
                  onBackPress={() => navigation.goBack()}
                />
              ),
            })}>
            {(props) => (
              <LeadStatusList
                {...props}
                handleBottomSheetClose={handleClosePress}
                leadId={meta.leadId}
              />
            )}
          </Stack.Screen>
          <Stack.Screen
            name="LeadStageList"
            options={({ navigation }) => ({
              header: () => (
                <CustomHeader
                  title={t('updateStage')}
                  onClose={() => handleClosePress()}
                  backVisible={true}
                  onBackPress={() => navigation.goBack()}
                />
              ),
            })}>
            {(props) => (
              <LeadStageList
                {...props}
                changeSnapPoints={changeSnapPoints}
                handleBottomSheetClose={handleClosePress}
                leadId={meta.leadId}
              />
            )}
          </Stack.Screen>
          <Stack.Screen
            name="LeadStatusChange"
            options={({ navigation }) => ({
              header: () => (
                <CustomHeader
                  title={t('changeLeadStatus')}
                  onClose={() => handleClosePress()}
                  backVisible={true}
                  onBackPress={() => navigation.goBack()}
                />
              ),
            })}>
            {(props) => (
              <LeadStatusChange
                {...props}
                changeSnapPoints={changeSnapPoints}
                handleBottomSheetClose={handleClosePress}
                leadId={meta.leadId}
              />
            )}
          </Stack.Screen>
          <Stack.Screen
            name="LeadStageCloseWon"
            options={({ navigation }) => ({
              header: () => (
                <CustomHeader
                  title={t('changeLeadStage')}
                  onClose={() => handleClosePress()}
                  backVisible={true}
                  onBackPress={() => navigation.goBack()}
                />
              ),
            })}>
            {(props) => (
              <LeadStageCloseWon
                {...props}
                changeSnapPoints={changeSnapPoints}
                handleBottomSheetClose={handleClosePress}
                leadId={meta.leadId}
              />
            )}
          </Stack.Screen>
          <Stack.Screen
            name="LeadStageNegotiation"
            options={({ navigation }) => ({
              header: () => (
                <CustomHeader
                  title={t('changeLeadStage')}
                  onClose={() => handleClosePress()}
                  backVisible={true}
                  onBackPress={() => navigation.goBack()}
                />
              ),
            })}>
            {(props) => (
              <LeadStageNegotiation
                {...props}
                changeSnapPoints={changeSnapPoints}
                handleBottomSheetClose={handleClosePress}
                leadId={meta.leadId}
              />
            )}
          </Stack.Screen>
          <Stack.Screen
            name="LeadsFilter"
            options={() => ({
              header: () => (
                <CustomHeader
                  title={t('filter')}
                  onClose={() => handleClosePress()}
                />
              ),
            })}>
            {(props) => (
              <LeadsFilter
                {...props}
                changeSnapPoints={changeSnapPoints}
                changeRoute={handleClosePress}
              />
            )}
          </Stack.Screen>
          <Stack.Screen
            name="LeadsSortFilter"
            options={() => ({
              header: () => (
                <CustomHeader
                  title={t('sortBy')}
                  onClose={() => handleClosePress()}
                />
              ),
            })}>
            {(props) => (
              <LeadsSortFilter
                {...props}
                changeSnapPoints={changeSnapPoints}
                changeRoute={handleClosePress}
              />
            )}
          </Stack.Screen>
          <Stack.Screen
            name="DropdownListing"
            options={() => ({
              header: () => (
                <CustomHeader
                  title={t('sortBy')}
                  onClose={() => handleClosePress()}
                />
              ),
            })}>
            {(props) => (
              <DropdownListing
                {...props}
                changeSnapPoints={changeSnapPoints}
                changeRoute={handleClosePress}
                handleSearch={(search) => meta.handleSearch(search)}
                dropdownData={meta.dropdownData}
                handelSelectData={(id) => meta.handelSelectData(id)}
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </BottomSheetModal>
  );
};

export default BottomSheetNavigator;
