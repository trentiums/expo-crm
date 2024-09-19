import { Spacer } from '@atoms/common/common.styles';
import FieldTextInput from '@molecules/FieldTextInput/FieldTextInput';
import {
  ContainerView,
  DropdownView,
  FormButtonText,
  InputView,
  RowView,
  SubContainerView,
} from '@organisms/LeadDetailsForm/LeadDetailsForm.styles';
import {
  composeValidators,
  numberAndFractionalNumberValidator,
  requiredValidator,
} from '@utils/formValidators';
import React, { useEffect, useState } from 'react';
import { Field, useFormState } from 'react-final-form';
import { useTranslation } from 'react-i18next';
import { DealWinCloseFormProps } from './DealCloseWinForm.props';
import {
  CancelButtonView,
  CancelText,
  FormsView,
} from '@organisms/LeadStatusChangeForm/LeadStatusChangeForm.styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Label } from '@organisms/BasicInformationForm/BasicInformationForm.styles';
import { ButtonSubmit } from '@organisms/LoginForm/LoginForm.styles';
import { RootState, useAppDispatch, useSelector } from '@redux/store';
import { useAppTheme } from '@constants/theme';
import FieldDropDown from '@organisms/FieldDropDown/FieldDropdown';
import { getLeadDetailsAction } from '@redux/actions/lead';
import Loader from '@atoms/Loader/Loader';
import { DropdownDataType } from '@organisms/FieldDropDown/FieldDropDown.props';

const DealCloseWinForm: React.FC<DealWinCloseFormProps> = ({
  loading,
  onCancelPress,
  isDealClose,
  form,
  leadCardId,
}) => {
  const { t } = useTranslation('dealWinClose');
  const { t: tb } = useTranslation('formButtonName');
  const { t: tl } = useTranslation('leadDetails');
  const dispatch = useAppDispatch();
  const colors = useAppTheme();
  const { valid } = useFormState({ subscription: { valid: true } });
  const leadDetails = useSelector(
    (state: RootState) => state.leads.leadsDetail,
  );
  const leadsData = useSelector(
    (state: RootState) => state.leads.leadList.leads,
  );
  const currencyList = useSelector(
    (state: RootState) => state.general.currencyList,
  );
  const data = leadsData?.filter((item) => item?.id === leadCardId);

  const [leadLoading, setLeadLoading] = useState(false);
  useEffect(() => {
    form.change('dealAmountCurrencyCode', leadDetails?.budgetCurrencyCode);
    form.change('dealAmount', `${leadDetails.dealAmount || ''}`);
    form.change('reason', leadDetails.winCloseReason || '');
  }, []);

  const handleGetLeadDetails = async () => {
    setLeadLoading(true);
    await dispatch(getLeadDetailsAction({ lead_id: leadCardId }));
    setLeadLoading(false);
  };

  useEffect(() => {
    handleGetLeadDetails();
  }, [leadCardId]);
  return (
    <>
      {leadLoading ? (
        <Loader color={colors.blueChaos} />
      ) : (
        <FormsView>
          <KeyboardAwareScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="always">
            <Label>{t('dealAmount')}</Label>
            <RowView>
              <DropdownView>
                <Field
                  name={'dealAmountCurrencyCode'}
                  component={FieldDropDown}
                  listData={currencyList?.map((item) => {
                    return {
                      id: item.id,
                      title: item.currencyCodeAlpha,
                    };
                  })}
                  isShowSelected
                  placeholder={t('budget')}
                  heading={tl('selectBudget')}
                  dropdownDataType={DropdownDataType.BUDGET}
                />
              </DropdownView>
              <InputView>
                <Field
                  name="dealAmount"
                  placeholder={t('dealAmount')}
                  component={FieldTextInput}
                  keyboardType="numeric"
                  isFloatValue
                  validate={composeValidators(
                    numberAndFractionalNumberValidator,
                  )}
                />
              </InputView>
            </RowView>
            <Spacer size={16} />
            {!isDealClose && (
              <>
                <Label>{t('description')}</Label>
                <Field
                  name="description"
                  placeholder={t('description')}
                  component={FieldTextInput}
                  numberOfLines={5}
                  style={{
                    height: 85,
                    backgroundColor: colors?.iceWindDale,
                  }}
                  multiline
                  contentStyle={{ marginTop: -10 }}
                />
                <Spacer size={16} />
              </>
            )}
            <Label>{isDealClose ? `${t('reason')} *` : t('reason')}</Label>
            <Field
              name="reason"
              placeholder={t('reason')}
              component={FieldTextInput}
              validate={isDealClose && requiredValidator}
            />
          </KeyboardAwareScrollView>
          <ContainerView>
            <SubContainerView>
              <CancelButtonView onPress={() => onCancelPress?.()}>
                <CancelText>{tb('cancel')}</CancelText>
              </CancelButtonView>
            </SubContainerView>
            <SubContainerView>
              <ButtonSubmit
                onPress={!loading && form.submit}
                loading={loading}
                variant={valid}>
                <FormButtonText valid={valid}>{tb('save')}</FormButtonText>
              </ButtonSubmit>
            </SubContainerView>
          </ContainerView>
        </FormsView>
      )}
    </>
  );
};

export default DealCloseWinForm;
