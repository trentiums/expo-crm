import { Spacer } from "@atoms/common/common.styles";
import FieldTextInput from "@molecules/FieldTextInput/FieldTextInput";
import {
  ContainerView,
  FormButtonText,
  SubContainerView,
} from "@organisms/LeadDetailsForm/LeadDetailsForm.styles";
import {
  composeValidators,
  numberValidator,
  requiredValidator,
} from "@utils/formValidators";
import React, { useEffect } from "react";
import { Field, useFormState } from "react-final-form";
import { useTranslation } from "react-i18next";
import { DealWinCloseFormProps } from "./DealCloseWinForm.props";
import {
  CancelButtonView,
  CancelText,
  FormsView,
} from "@organisms/LeadStatusChangeForm/LeadStatusChangeForm.styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CloseIcon from "@atoms/Illustrations/Close";
import { Label } from "@organisms/BasicInformatioForm/BasicInformationForm.styles";
import { ButtonSubmit } from "@organisms/LoginForm/LoginForm.styles";
import { RootState, useSelector } from "@redux/store";
import { CrossIconView } from "./DealCloseWinForm.styles";

const DealCloseWinForm: React.FC<DealWinCloseFormProps> = ({
  loading,
  onCancelPress,
  isDealClose,
  form,
  leadCardId,
}) => {
  const { t } = useTranslation("dealWinClose");
  const { t: tb } = useTranslation("formButtonName");
  const { valid } = useFormState({ subscription: { valid: true } });
  const leadsData = useSelector(
    (state: RootState) => state.leads.leadList.leads
  );
  const data = leadsData?.filter((item) => item?.id === leadCardId);
  useEffect(() => {
    form.change("dealAmount", `${data?.[0]?.dealAmount || ""}`);
    form.change("reason", data?.[0]?.winCloseReason || "");
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
        <Label>{t("dealAmount")}</Label>
        <Field
          name="dealAmount"
          placeholder={t("dealAmount")}
          component={FieldTextInput}
          keyboardType="numeric"
          isFloatValue
          validate={composeValidators(numberValidator)}
        />
        <Spacer size={16} />
        {!isDealClose && (
          <>
            <Label>{t("description")}</Label>
            <Field
              name="description"
              placeholder={t("description")}
              component={FieldTextInput}
            />
            <Spacer size={16} />
          </>
        )}
        <Label>{isDealClose ? `${t("reason")} *` : t("reason")}</Label>
        <Field
          name="reason"
          placeholder={t("reason")}
          component={FieldTextInput}
          validate={isDealClose && requiredValidator}
        />
      </KeyboardAwareScrollView>
      <ContainerView>
        <SubContainerView>
          <CancelButtonView onPress={() => onCancelPress?.()}>
            <CancelText>{tb("cancel")}</CancelText>
          </CancelButtonView>
        </SubContainerView>
        <SubContainerView>
          <ButtonSubmit onPress={form.submit} loading={loading} valid={valid}>
            <FormButtonText valid={valid}>{tb("save")}</FormButtonText>
          </ButtonSubmit>
        </SubContainerView>
      </ContainerView>
    </FormsView>
  );
};

export default DealCloseWinForm;
