import { Spacer } from "@atoms/common/common.styles";
import FieldTextInput from "@molecules/FieldTextInput/FieldTextInput";
import {
  ContainerView,
  FormButtonText,
  SubContainerView,
} from "@organisms/LeadDetailsForm/LeadDetailsForm.styles";
import {
  composeValidators,
  numberAndFractionalNumberValidator,
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
import { Label } from "@organisms/BasicInformatioForm/BasicInformationForm.styles";
import { ButtonSubmit } from "@organisms/LoginForm/LoginForm.styles";
import { RootState, useSelector } from "@redux/store";
import { useAppTheme } from "@constants/theme";

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
  console.log(leadCardId, "leadCardId");
  const data = leadsData?.filter((item) => item?.id === leadCardId);
  const { colors } = useAppTheme();
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
        <Label>{t("dealAmount")}</Label>
        <Field
          name="dealAmount"
          placeholder={t("dealAmount")}
          component={FieldTextInput}
          keyboardType="numeric"
          isFloatValue
          validate={composeValidators(numberAndFractionalNumberValidator)}
        />
        <Spacer size={16} />
        {!isDealClose && (
          <>
            <Label>{t("description")}</Label>
            <Field
              name="description"
              placeholder={t("description")}
              component={FieldTextInput}
              numberOfLines={5}
              style={{
                height: 85,
                backgroundColor: colors?.transparent,
              }}
              multiline
              contentStyle={{ marginTop: -10 }}
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
