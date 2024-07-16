import { Spacer } from "@atoms/common/common.styles";
import FieldTextInput from "@molecules/FieldTextInput/FieldTextInput";
import { Label } from "@organisms/BasicInformatioForm/BasicInformationForm.styles";
import {
  composeValidators,
  numberValidator,
  requiredValidator,
  websiteLinkValidator,
} from "@utils/formValidators";
import React, { useEffect, useState } from "react";
import { Field, useFormState } from "react-final-form";
import { useTranslation } from "react-i18next";
import { CompanyInfoFormProps } from "./CompanyInformation.props";
import {
  ButtonSubmit,
  ContainerView,
  FormButtonText,
  KeyboardAwareScrollViewContainer,
  SubContainerView,
} from "./CompanyInformationForm.styles";
import { FormsView } from "@organisms/LeadDetailsForm/LeadDetailsForm.styles";
import { RootState, useAppDispatch, useSelector } from "@redux/store";
import { useRoute } from "@react-navigation/native";
import { addLeadInformation } from "../../../src/redux/slices/leads";

const CompanyInformationForm: React.FC<CompanyInfoFormProps> = ({
  form,
  loading,
  isSave,
  onBackClick,
}) => {
  const { t } = useTranslation("companyInformation");
  const { t: tb } = useTranslation("formButtonName");
  const { values, valid } = useFormState();
  const dispatch = useAppDispatch();
  const route = useRoute();
  const [id] = useState(route?.params?.slug);

  const addLeadFormData = useSelector(
    (state: RootState) => state.leads.addLead
  );
  const leadsDetail = useSelector(
    (state: RootState) => state.leads.leadsDetail
  );

  useEffect(() => {
    form.change(
      "companyName",
      id ? leadsDetail?.companyName || "" : addLeadFormData?.companyName
    );
    form.change(
      "companySize",
      id ? leadsDetail.companySize || "" : addLeadFormData?.companySize
    );
    form.change(
      "webSite",
      id ? leadsDetail?.webSite || "" : addLeadFormData.webSite || ""
    );
  }, [id]);
  useEffect(() => {
    dispatch(
      addLeadInformation({
        ...addLeadFormData,
        companyName: values.companyName,
        companySize: values.companySize,
        webSite: values.webSite,
      })
    );
  }, [values]);
  return (
    <FormsView>
      <KeyboardAwareScrollViewContainer
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always">
        <Label>{t("companyNameLabel")}</Label>
        <Field
          name="companyName"
          placeholder={t("companyNameLabel")}
          component={FieldTextInput}
        />
        <Spacer size={16} />

        <Label>{t("companySizeLabel")}</Label>
        <Field
          name="companySize"
          placeholder={t("companySizeLabel")}
          component={FieldTextInput}
          keyboardType="numeric"
          validate={composeValidators(numberValidator)}
        />
        <Spacer size={16} />
        <Label>{t("websiteLabel")}</Label>
        <Field
          name="webSite"
          placeholder={t("websiteLabel")}
          component={FieldTextInput}
        />
        <Spacer size={16} />
      </KeyboardAwareScrollViewContainer>
      <ContainerView>
        <SubContainerView>
          <ButtonSubmit
            onPress={() => onBackClick?.()}
            loading={loading}
            valid={true}>
            <FormButtonText valid={true}>{tb("previous")}</FormButtonText>
          </ButtonSubmit>
        </SubContainerView>
        <SubContainerView>
          <ButtonSubmit
            onPress={!loading && form.submit}
            loading={loading}
            valid={valid}>
            <FormButtonText valid={valid}>{tb("next")}</FormButtonText>
          </ButtonSubmit>
        </SubContainerView>
      </ContainerView>
    </FormsView>
  );
};

export default CompanyInformationForm;
