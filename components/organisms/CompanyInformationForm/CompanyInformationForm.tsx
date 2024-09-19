import { Spacer } from '@atoms/common/common.styles';
import FieldTextInput from '@molecules/FieldTextInput/FieldTextInput';
import { Label } from '@organisms/BasicInformationForm/BasicInformationForm.styles';
import React, { useEffect, useState } from 'react';
import { Field, useFormState } from 'react-final-form';
import { useTranslation } from 'react-i18next';
import { CompanyInfoFormProps } from './CompanyInformation.props';
import {
  BackButton,
  BackButtonText,
  ButtonSubmit,
  ContainerView,
  FormButtonText,
  KeyboardAwareScrollViewContainer,
  SubContainerView,
} from './CompanyInformationForm.styles';
import { FormsView } from '@organisms/LeadDetailsForm/LeadDetailsForm.styles';
import { RootState, useAppDispatch, useSelector } from '@redux/store';
import { useRoute } from '@react-navigation/native';
import { addLeadInformation } from '@redux/slices/leads';
import { companySizes } from '@utils/constant';
import FieldDropDown from '@organisms/FieldDropDown/FieldDropdown';

const CompanyInformationForm: React.FC<CompanyInfoFormProps> = ({
  form,
  loading,
  onBackClick,
}) => {
  const { t } = useTranslation('companyInformation');
  const { t: tb } = useTranslation('formButtonName');
  const { values, valid } = useFormState();
  const dispatch = useAppDispatch();
  const route = useRoute();
  const [id] = useState(route?.params?.slug);

  const addLeadFormData = useSelector(
    (state: RootState) => state.leads.addLead,
  );
  const leadsDetail = useSelector(
    (state: RootState) => state.leads.leadsDetail,
  );

  useEffect(() => {
    form.change(
      'companyName',
      id ? leadsDetail?.companyName || '' : addLeadFormData?.companyName,
    );
    form.change(
      'companySize',
      id ? +leadsDetail.companySize || '' : addLeadFormData?.companySize,
    );
    form.change(
      'webSite',
      id ? leadsDetail?.webSite || '' : addLeadFormData.webSite || '',
    );
  }, [id]);
  useEffect(() => {
    dispatch(
      addLeadInformation({
        ...addLeadFormData,
        companyName: values.companyName,
        companySize: values.companySize,
        webSite: values.webSite,
      }),
    );
  }, [values]);
  return (
    <FormsView>
      <KeyboardAwareScrollViewContainer
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always">
        <Label variant="SF-Pro-Display-Medium_500">
          {t('companyNameLabel')}
        </Label>
        <Field
          name="companyName"
          placeholder={t('companyNameLabel')}
          component={FieldTextInput}
        />
        <Spacer size={16} />

        <Label variant="SF-Pro-Display-Medium_500">
          {t('companySizeLabel')}
        </Label>
        <Field
          name={'companySize'}
          component={FieldDropDown}
          listData={companySizes}
        />
        <Spacer size={16} />
        <Label variant="SF-Pro-Display-Medium_500">{t('websiteLabel')}</Label>
        <Field
          name="webSite"
          placeholder={t('websiteLabel')}
          component={FieldTextInput}
        />
        <Spacer size={16} />
      </KeyboardAwareScrollViewContainer>
      <ContainerView>
        <SubContainerView>
          <BackButton onPress={() => onBackClick?.()} loading={false}>
            <BackButtonText valid={true} variant="SF-Pro-Display-Semibold_600">
              {tb('previous')}
            </BackButtonText>
          </BackButton>
        </SubContainerView>
        <SubContainerView>
          <ButtonSubmit
            onPress={!loading && form.submit}
            loading={loading}
            valid={true}>
            <FormButtonText valid={true} variant="SF-Pro-Display-Semibold_600">
              {id ? tb('save') : tb('next')}
            </FormButtonText>
          </ButtonSubmit>
        </SubContainerView>
      </ContainerView>
    </FormsView>
  );
};

export default CompanyInformationForm;
