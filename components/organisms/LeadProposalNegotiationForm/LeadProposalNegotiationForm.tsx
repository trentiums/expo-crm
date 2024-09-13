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
import { LeadProposalNegotiationFormProps } from './LeadProposalNegotiationForm.props';
import {
  CancelButtonView,
  CancelText,
  FormsView,
} from '@organisms/LeadStatusChangeForm/LeadStatusChangeForm.styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Spacer } from '@atoms/common/common.styles';
import { Label } from '@organisms/BasicInformationForm/BasicInformationForm.styles';
import { useAppTheme } from '@constants/theme';

const LeadProposalNegotiationForm: React.FC<
  LeadProposalNegotiationFormProps
> = ({ form, loading, onCancelPress }) => {
  const { t: tl } = useTranslation('leadDetails');
  const { t: tb } = useTranslation('formButtonName');
  const { valid } = useFormState();
  const { colors } = useAppTheme();

  return (
    <FormsView>
      <KeyboardAwareScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always">
        <Spacer size={16} />
        <Label>{`${tl('description')} *`}</Label>
        <Field
          name="description"
          placeholder={tl('description')}
          component={FieldTextInput}
          validate={composeValidators(requiredValidator)}
          numberOfLines={5}
          style={{
            height: 85,
            backgroundColor: colors?.transparent,
          }}
          multiline
          contentStyle={{ marginTop: -10 }}
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

export default LeadProposalNegotiationForm;
