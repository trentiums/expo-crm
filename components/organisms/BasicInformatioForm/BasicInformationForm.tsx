import React, { useEffect, useState } from "react";
import { Field, useFormState } from "react-final-form";
import * as DocumentPicker from "expo-document-picker";
import {
  AddIconButton,
  ButtonSubmit,
  CloseButton,
  CountryCodeInput,
  CrossIconContainer,
  DialCodeDropDownView,
  DialCodeText,
  DocumentView,
  ErrorText,
  FlatListCon,
  FormButtonText,
  HeaderText,
  ImagePreviewShow,
  ImageView,
  KeyboardAwareScrollViewContainer,
  Label,
  ModalView,
  NumberInput,
  PhoneNumberFieldView,
  PickerContainer,
  PressAbleContainer,
  PreviewImageView,
  SelectedFlagView,
  StyledModal,
  SvgShowContainer,
  UploadText,
} from "./BasicInformationForm.styles";
import { useTranslation } from "react-i18next";

import FieldTextInput from "@molecules/FieldTextInput/FieldTextInput";
import {
  composeValidators,
  emailOrPhoneValidator,
  emailValidator,
  maxLengthValidator,
  numberValidator,
  requiredValidator,
} from "@utils/formValidators";
import { BasicInfoFormProps } from "./BasicInformationForm.props";
import { Spacer } from "@atoms/common/common.styles";
import AddIcon from "@atoms/Illustrations/AddIcon";
import Trash from "@atoms/Illustrations/Trash";
import { useAppTheme } from "@constants/theme";
import ActionModal from "@molecules/ActionModal/ActionModal";
import { Actions } from "@molecules/ActionModal/ActionModal.props";
import Document from "@atoms/Illustrations/Document";
import CrossIcon from "@atoms/Illustrations/Cross";
import { FormsView } from "@organisms/LeadDetailsForm/LeadDetailsForm.styles";
import { RootState, useAppDispatch, useSelector } from "@redux/store";
import { LeadListState } from "@type/api/lead";
import {
  deleteLeadDocumentsAction,
  getLeadDetailsAction,
} from "@redux/actions/lead";
import { useToast } from "react-native-toast-notifications";
import { ToastTypeProps } from "@molecules/Toast/Toast.props";
import { MAX_FILE_SIZE } from "@utils/constant";
import { SvgUri } from "react-native-svg";
import { addLeadInformation } from "@redux/slices/leads";
import { useLocalSearchParams } from "expo-router";
import * as MediaLibrary from "expo-media-library";
import DropDown from "@molecules/DropDown/DropDown";
import Pdf from "react-native-pdf";

const BasicInformationForm: React.FC<BasicInfoFormProps> = ({
  loading,
  form,
  isSave,
  setSelectedCountryCodeValue,
  selectedCountryCodeValue,
  documentArray,
  setDocumentArray,
}) => {
  const params = useLocalSearchParams();
  const { colors } = useAppTheme();
  const { t } = useTranslation("BasicInformation");
  const { t: tb } = useTranslation("formButtonName");
  const { t: tm } = useTranslation("modalText");
  const addLeadFormData = useSelector(
    (state: RootState) => state.leads.addLead
  );

  const [id] = useState(params?.slug);
  const dispatch = useAppDispatch();
  const toast = useToast();
  const [selectedData, setSelectedData] = useState<LeadListState | undefined>();
  const [showModal, setShowModal] = useState<Boolean>(false);
  const [countryCodeError, setCountryCodeError] = useState("");
  const [ImageURI, setImageURI] = useState<{
    name?: string;
    uri?: string;
  }>({});
  const [deleteShowModal, setDeleteShowModal] = useState<Boolean>(false);
  const addLeadData = useSelector((state: RootState) => state.leads.addLead);

  const { values, valid } = useFormState();
  const countryListData = useSelector(
    (state: RootState) => state.general.countryList
  );
  const leadsDetail = useSelector(
    (state: RootState) => state.leads.leadsDetail
  );
  const leadsData = useSelector(
    (state: RootState) => state.leads.leadList?.leads
  );
  const [deleteLoading, setDeleteLoading] = useState(false);
  useEffect(() => {
    const data = leadsData?.filter((item) => item.id === id);
    setSelectedData(data?.[0]);
  }, [id]);
  const [deleteDocumentUrl, setDeleteDocumentUrl] = useState(null);
  useEffect(() => {
    if (values.phoneNumber && !selectedCountryCodeValue) {
      setCountryCodeError(t("countryCodeError"));
    } else if (!values.phoneNumber && selectedCountryCodeValue) {
      setCountryCodeError(t("phoneNumberError"));
    } else if (values.phoneNumber && selectedCountryCodeValue) {
      setCountryCodeError("");
    } else if (!values.phoneNumber && !selectedCountryCodeValue) {
      setCountryCodeError("");
    }
  }, [values, selectedCountryCodeValue]);

  useEffect(() => {
    const initializePermissionsAndForm = async () => {
      if (id) {
        setSelectedCountryCodeValue(
          leadsDetail?.countryId ||
            leadsData.filter((item) => item?.id === id)?.[0]?.countryId
        );
      }
      if (id) {
        setDocumentArray(leadsDetail?.documents);
      }
      form.change(
        "firstName",
        id
          ? leadsData?.filter((item) => item?.id === id)?.[0]?.name ||
              leadsDetail?.name
          : addLeadFormData?.fullName
      );
      form.change(
        "email",
        id
          ? leadsData?.filter((item) => item?.id === id)?.[0]?.email ||
              leadsDetail?.email
          : addLeadFormData?.email
      );
      form.change(
        "phoneNumber",
        id
          ? leadsData?.filter((item) => item?.id === id)?.[0]?.phone ||
              leadsDetail?.phone
          : addLeadFormData.phoneNumber
      );
    };

    initializePermissionsAndForm();
  }, [id, selectedData]);
  const pickFile = async () => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        return;
      }
      const res = await DocumentPicker.getDocumentAsync({
        type: ["application/pdf", "image/*", "text/plain"],
        copyToCacheDirectory: true,
      });
      console.log(res, "res");

      if (!res.canceled) {
        res.assets.forEach((file) => {
          if (file.size > MAX_FILE_SIZE) {
            toast.show("File size limit exceeded", {
              type: "customToast",
              data: {
                type: ToastTypeProps.Error,
              },
            });
          } else {
            setDocumentArray((prevImages) => [...prevImages, file]);
          }
        });
      } else {
        console.log("cancelled");
      }
    } catch (err) {
      console.log("error", err);
      throw err;
    }
  };

  const onDeleteActionPress = async () => {
    const deletedDocument = documentArray?.filter(
      (item) => item?.uri === deleteDocumentUrl
    );

    const updatedDocuments = documentArray?.filter(
      (item) => item?.uri !== deleteDocumentUrl
    );

    if (deletedDocument?.[0]?.id) {
      try {
        setDeleteLoading(true);
        const response = await dispatch(
          deleteLeadDocumentsAction({ media_id: deletedDocument?.[0]?.id })
        ).unwrap();
        toast.show(response?.message, {
          type: "customToast",
          data: {
            type: ToastTypeProps.Success,
          },
        });
      } catch (error) {
        toast.show(error, {
          type: "customToast",
          data: {
            type: ToastTypeProps.Error,
          },
        });
      }
      setDeleteLoading(false);
    }
    await dispatch(getLeadDetailsAction({ lead_id: +id }));
    setDeleteShowModal(false);
    setDocumentArray(updatedDocuments);
  };

  const renderFilePreview = (file: any) => {
    const type = file?.type || file.mimeType;
    return (
      <PressAbleContainer
        onPress={() => {
          setImageURI(file);
          setShowModal(true);
        }}>
        <CrossIconContainer
          onPress={() => {
            setDeleteShowModal(true);
            setDeleteDocumentUrl(file?.uri);
          }}>
          <CrossIcon color={"#fff"} />
        </CrossIconContainer>
        {type?.includes("image") ? (
          <ImagePreviewShow source={{ uri: file?.uri }} />
        ) : (
          <SvgShowContainer>
            <Document />
          </SvgShowContainer>
        )}
      </PressAbleContainer>
    );
  };

  useEffect(() => {
    dispatch(
      addLeadInformation({
        ...addLeadData,
        fullName: values.firstName,
        email: values.email,
        phoneNumber: values.phoneNumber,
        countryCode: selectedCountryCodeValue,
      })
    );
  }, [values, selectedCountryCodeValue]);

  return (
    <FormsView>
      <KeyboardAwareScrollViewContainer
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always">
        <Label>{`${t("firstNameLabel")} *`}</Label>
        <Field
          name="firstName"
          placeholder={t("firstNameLabel")}
          component={FieldTextInput}
          validate={requiredValidator}
        />
        <Spacer size={16} />
        <Label>{t("emailLabel")}</Label>
        <Field
          name="email"
          placeholder={t("emailLabel")}
          component={FieldTextInput}
          keyboardType="email-address"
          validate={composeValidators(
            (value) => emailOrPhoneValidator(value, form.getState().values),
            emailValidator
          )}
        />
        <Spacer size={16} />
        <Label>{t("phoneNumberLabel")}</Label>
        <PhoneNumberFieldView>
          <CountryCodeInput>
            <DropDown
              data={countryListData?.map((item) => ({
                title: item?.dialCode,
                id: item?.id,
                image: item?.flag,
              }))}
              placeholder={t("selectCountry")}
              value={selectedCountryCodeValue}
              onChange={(value: { label: string | number }) => {
                if (selectedCountryCodeValue !== value) {
                  setSelectedCountryCodeValue(value);
                } else {
                  setSelectedCountryCodeValue("");
                }
              }}
            />
          </CountryCodeInput>
          <NumberInput>
            <Field
              name="phoneNumber"
              placeholder={t("phoneNumberLabel")}
              component={FieldTextInput}
              keyboardType="phone-pad"
              validate={composeValidators(
                numberValidator,
                maxLengthValidator(15)
              )}
            />
          </NumberInput>
        </PhoneNumberFieldView>
        <Spacer size={8} />

        <Spacer size={16} />
        <PickerContainer onPress={pickFile}>
          <AddIconButton>
            <AddIcon />
            <UploadText>{t("uploadDocuments")}</UploadText>
          </AddIconButton>
        </PickerContainer>
        <Spacer size={16} />

        {documentArray?.length > 0 && (
          <>
            <HeaderText>{t("attachments")}</HeaderText>
            <Spacer size={8} />
            <FlatListCon
              data={documentArray}
              renderItem={({ item }) => (
                <DocumentView>{renderFilePreview(item)}</DocumentView>
              )}
              keyExtractor={(item, index) => index.toString()}
              numColumns={3}
            />
          </>
        )}

        {deleteShowModal && (
          <ActionModal
            isModal
            onBackdropPress={() => {
              setDeleteShowModal(false);
            }}
            heading={tm("discardMedia")}
            description={tm("disCardDescription")}
            label={tm("yesDiscard")}
            actionType={Actions.delete}
            actiontext={tm("cancel")}
            onCancelPress={() => {
              setDeleteShowModal(false);
            }}
            onActionPress={() => onDeleteActionPress()}
            icon={<Trash color={colors?.deleteColor} />}
            loading={deleteLoading}
          />
        )}

        <StyledModal
          animationType="slide"
          transparent={true}
          onRequestClose={() => setShowModal(false)}
          visible={showModal}>
          <ModalView>
            <CloseButton onPress={() => setShowModal(false)}>
              <CrossIcon color={colors.black} />
            </CloseButton>
            <Spacer size={64} />
            {/* <PreviewImageView source={{ uri: ImageURI?.uri }} /> */}
            {/* <WebView
              source={{
                uri: "https://morth.nic.in/sites/default/files/dd12-13_0.pdf",
              }}
              style={{
                container: {
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                },
                webview: {
                  flex: 1,
                  width: "100%",
                },
              }}
            /> */}
            {/* <PdfReader
              source={{
                uri: "https://morth.nic.in/sites/default/files/dd12-13_0.pdf",
              }}
              style={{ flex: 1 }}
            /> */}

            {/* {console.log(
              ImageURI && ImageURI?.uri?.endsWith("pdf"),
              " ImageURI?.uri"
            )}
            <Pdf
              source={{
                uri: null,
              }}
              trustAllCerts={false}
              style={{
                flex: 1,
                width: "100%",
              }}
              onError={(error) => {
                console.error(error, "error");
              }}
            /> */}
            {/* {ImageURI && ImageURI?.uri?.endsWith("pdf") ? (
              <>
                <Pdf
                  source={{
                    uri: ImageURI?.uri,
                  }}
                  trustAllCerts={false}
                  style={{
                    flex: 1,
                    width: "100%",
                  }}
                  onError={(error) => {
                    console.error(error, "error");
                  }}
                />
              </>
            ) : (
              <PreviewImageView source={{ uri: ImageURI?.uri }} />
            )} */}
          </ModalView>
        </StyledModal>
        <Spacer size={70} />
      </KeyboardAwareScrollViewContainer>
      <ButtonSubmit
        onPress={!loading && !countryCodeError && form.submit}
        loading={loading}
        valid={valid && !countryCodeError}>
        <FormButtonText valid={valid && !countryCodeError}>
          {id ? tb("save") : tb("next")}
        </FormButtonText>
      </ButtonSubmit>
    </FormsView>
  );
};

export default BasicInformationForm;
