import React from "react";
import {
  DateContainer,
  DateFilterContainer,
  LeadsFilterFormContainer,
} from "./LeadsFilterForm.styles";
import { Field, useFormState } from "react-final-form";
import { useTranslation } from "react-i18next";
import { Label } from "@organisms/UserInformationForm/UserInformationForm.styles";
import FieldDatePicker from "@molecules/FieldDatePicker/FieldDatePicker";
import moment from "moment";
import DropDown from "@molecules/DropDown/DropDown";
import { RootState, useSelector } from "@redux/store";
import { Spacer } from "@atoms/common/common.styles";
import { orderByList } from "../../../constant";
import { FormButtonText } from "@organisms/BasicInformatioForm/BasicInformationForm.styles";
import { LeadFilterFormProps } from "./LeadsFilterForm.props";

const LeadsFilterForm: React.FC<LeadFilterFormProps> = ({
  form,
  selectedChannel,
  setSelectedChannel,
  selectedLead,
  setSelectedLead,
  selectedStage,
  setSelectedStage,
  orderBy,
  setOrderBy,
  sortBy,
  setSortBy,
}) => {
  const { t } = useTranslation("leadsFilter");
  const { values, valid } = useFormState();
  const general = useSelector((state: RootState) => state.general);
  return (
    <LeadsFilterFormContainer>
      <DateFilterContainer>
        <DateContainer>
          <Label>{t("startDate")}</Label>
          <Field
            name="startDate"
            component={FieldDatePicker}
            initialDate={values?.startDate || moment().clone().toDate()}
          />
        </DateContainer>
        <DateContainer>
          <Label>{t("endDate")}</Label>
          <Field
            name="endDate"
            component={FieldDatePicker}
            initialDate={values?.endDate || moment().clone().toDate()}
          />
        </DateContainer>
      </DateFilterContainer>
      <Spacer size={16} />
      <Label>{`${t("orderBy")}`}</Label>
      <DropDown
        data={orderByList}
        placeholder={t("orderBy")}
        value={orderBy}
        onChange={(value: any) => {
          if (orderBy === value) {
            setOrderBy();
          } else {
            setOrderBy(value);
          }
        }}
        dropDownTitle={`${t("orderBy")} ${t("list")}`}
      />
      <Spacer size={16} />
      <Label>{`${t("sortBy")}`}</Label>
      <DropDown
        data={orderByList}
        placeholder={t("sortBy")}
        value={sortBy}
        onChange={(value: any) => {
          if (orderBy === value) {
            setSortBy();
          } else {
            setSortBy(value);
          }
        }}
        dropDownTitle={`${t("sortBy")} ${t("list")}`}
      />
      <Spacer size={16} />
      <Label>{`${t("channel")}`}</Label>
      <DropDown
        data={general.leadChannelList?.map((item) => {
          return {
            id: item.id,
            title: item?.name,
          };
        })}
        placeholder={t("channel")}
        value={selectedChannel}
        onChange={(value: any) => {
          if (selectedChannel === value) {
            setSelectedChannel();
          } else {
            setSelectedChannel(value);
          }
        }}
        dropDownTitle={`${t("channel")} ${t("list")}`}
      />
      <Spacer size={16} />
      <Label>{`${t("status")}`}</Label>
      <DropDown
        data={general.leadStatusList?.map((item) => {
          return {
            id: item.id,
            title: item?.name,
          };
        })}
        placeholder={t("status")}
        value={selectedLead}
        onChange={(value: any) => {
          if (selectedStage === value) {
            setSelectedStage();
          } else {
            setSelectedLead(value);
          }
        }}
        dropDownTitle={`${t("status")} ${t("list")}`}
      />
      <Spacer size={16} />
      <Label>{`${t("conversion")}`}</Label>
      <DropDown
        data={general.leadConversionList?.map((item) => {
          return {
            id: item.id,
            title: item?.name,
          };
        })}
        placeholder={t("conversion")}
        value={selectedStage}
        onChange={(value: any) => {
          if (selectedStage === value) {
            setSelectedStage();
          } else {
            setSelectedStage(value);
          }
        }}
        dropDownTitle={`${t("conversion")} ${t("list")}`}
      />
      <FormButtonText onPress={form.submit}>{t("applyFilter")}</FormButtonText>
    </LeadsFilterFormContainer>
  );
};

export default LeadsFilterForm;
