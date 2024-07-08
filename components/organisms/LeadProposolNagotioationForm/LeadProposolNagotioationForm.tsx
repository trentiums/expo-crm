import FieldTextInput from '@molecules/FieldTextInput/FieldTextInput';
import {
  ContainerView,
  SubContainerView,
  FormButtonText,
} from '@organisms/LeadDetailsForm/LeadDetailsForm.styles';
import { composeValidators, requiredValidator } from '@utils/formValidators';
import React from 'react';
import { Field, useFormState } from 'react-final-form';
import { useTranslation } from 'react-i18next';
import { ButtonSubmit } from '@organisms/LoginForm/LoginForm.styles';
import { LeadProposalNegotiationFormProps } from './LeadProposolNegotiationForm.props';
import {
  CancelButtonView,
  CancelText,
  FormsView,
} from '@organisms/LeadStatusChangeForm/LeadStatusChangeForm.styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { CrossIconView } from '@screens/LeadListScreen/LeadListScreen.styles';
import CloseIcon from '@atoms/Illustrations/Close';
import { Spacer } from '@atoms/common/common.styles';
import { Label } from '@organisms/BasicInformatioForm/BasicInformationForm.styles';

const LeadProposalNegotiationForm: React.FC<
  LeadProposalNegotiationFormProps
> = ({ form, loading, onCancelPress }) => {
  const { t: tl } = useTranslation('leadDetails');
  const { t: tb } = useTranslation('formButtonName');
  const { valid } = useFormState();
  return (
    <FormsView>
      <KeyboardAwareScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always">
        <CrossIconView onPress={onCancelPress}>
          <CloseIcon />
        </CrossIconView>
        <Spacer size={16} />
        <Label>{`${tl('description')} *`}</Label>
        <Field
          name="description"
          placeholder={tl('description')}
          component={FieldTextInput}
          validate={composeValidators(requiredValidator)}
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
            <FormButtonText valid={valid}>{tb('next')}</FormButtonText>
          </ButtonSubmit>
        </SubContainerView>
      </ContainerView>
    </FormsView>
  );
};

export default LeadProposalNegotiationForm;
