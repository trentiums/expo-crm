import { Label } from '@organisms/BasicInformatioForm/BasicInformationForm.styles';
import {
  ContainerView,
  FormButtonText,
  SubContainerView,
} from '@organisms/LeadDetailsForm/LeadDetailsForm.styles';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Field, useFormState } from 'react-final-form';
import FieldTextInput from '@molecules/FieldTextInput/FieldTextInput';
import {
  composeValidators,
  numberValidator,
  requiredValidator,
  websiteLinkValidator,
} from '@utils/formValidators';
import { Spacer } from '@atoms/common/common.styles';
import { ButtonSubmit } from '@organisms/LoginForm/LoginForm.styles';
import { LeadStatusChangeFormProps } from './LeadStatusChangeForm.props';
import {
  CancelButtonView,
  CancelText,
  FormsView,
} from './LeadStatusChangeForm.styles';
import { CrossIconView } from '@screens/LeadListScreen/LeadListScreen.styles';
import CloseIcon from '@atoms/Illustrations/Close';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RootState, useSelector } from '@redux/store';

const LeadStatusChangeForm: React.FC<LeadStatusChangeFormProps> = ({
  form,
  loading,
  onCancelPress,
  leadCardId,
}) => {
  const { t } = useTranslation('companyInformation');
  const { t: tl } = useTranslation('leadDetails');
  const { t: tb } = useTranslation('formButtonName');
  const { valid } = useFormState({ subscription: { valid: true } });
  const leadsData = useSelector(
    (state: RootState) => state.leads.leadList.leads,
  );
  const data = leadsData?.filter((item) => item?.id === leadCardId);
  useEffect(() => {
    form.change('budget', data?.[0]?.budget);
    form.change('companyName', data?.[0]?.companyName || '');
    form.change('timeFrame', data?.[0]?.timeLine || '');
    form.change('webSite', data?.[0]?.webSite || '');
  }, []);
  return (
    <FormsView>
      <KeyboardAwareScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always">
        <CrossIconView onPress={onCancelPress}>
          <CloseIcon />
        </CrossIconView>
        <Label>{t('companyNameLabel')}</Label>
        <Field
          name="companyName"
          placeholder={t('companyNameLabel')}
          component={FieldTextInput}
        />
        <Spacer size={16} />
        <Label>{t('websiteLabel')}</Label>
        <Field
          name="webSite"
          placeholder={t('websiteLabel')}
          component={FieldTextInput}
        />
        <Spacer size={16} />
        <Label>{tl('budgetLabel')}</Label>
        <Field
          name="budget"
          placeholder={tl('budgetLabel')}
          component={FieldTextInput}
          isFloatValue
        />
        <Spacer size={16} />
        <Label>{tl('timeFrameToPurchaseLabel')}</Label>
        <Field
          name="timeFrame"
          placeholder={tl('timeFrameToPurchaseEg')}
          component={FieldTextInput}
        />
        <Spacer size={16} />
        <Label>{tl('commentsLabel')}</Label>
        <Field
          name="comments"
          placeholder={tl('commentsLabel')}
          component={FieldTextInput}
        />
      </KeyboardAwareScrollView>

      <ContainerView>
        <SubContainerView>
          <CancelButtonView onPress={() => onCancelPress?.()}>
            <CancelText>{tb('cancel')}</CancelText>
          </CancelButtonView>
        </SubContainerView>
        <SubContainerView>
          <ButtonSubmit onPress={form.submit} loading={loading} valid={valid}>
            <FormButtonText valid={valid}>{tb('save')}</FormButtonText>
          </ButtonSubmit>
        </SubContainerView>
      </ContainerView>
    </FormsView>
  );
};

export default LeadStatusChangeForm;
