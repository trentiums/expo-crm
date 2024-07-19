import React, { useEffect, useState } from "react";
import { Field, useFormState } from "react-final-form";
import DocumentPicker from "react-native-document-picker";
import Pdf from "react-native-pdf";
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
import ImageIcon from "@atoms/Illustrations/ImageIcone";
import CrossIcon from "@atoms/Illustrations/Cross";
import {
  FieldDropDownContainer,
  FormsView,
} from "@organisms/LeadDetailsForm/LeadDetailsForm.styles";
import { RootState, useAppDispatch, useSelector } from "@redux/store";
import { PermissionsAndroid, Platform } from "react-native";
import { PERMISSIONS, RESULTS, request } from "react-native-permissions";
import DropDown from "@atoms/DropDown/DropDown";
import { useRoute } from "@react-navigation/native";
import { LeadListState } from "@type/api/lead";
import { deleteLeadDocumentsAction } from "@redux/actions/lead";
import { useToast } from "react-native-toast-notifications";
import { ToastTypeProps } from "@molecules/Toast/Toast.props";
import { MAX_FILE_SIZE } from "@utils/constant";
import { SvgUri } from "react-native-svg";
import { addLeadInformation } from "@redux/slices/leads";

const BasicInformationForm: React.FC<BasicInfoFormProps> = ({
  loading,
  form,
  isSave,
  setSelectedCountryCodeValue,
  selectedCountryCodeValue,
  documentArray,
  setDocumentArray,
}) => {
  const { colors } = useAppTheme();
  const { t } = useTranslation("BasicInformation");
  const { t: tb } = useTranslation("formButtonName");
  const { t: tm } = useTranslation("modalText");
  const addLeadFormData = useSelector(
    (state: RootState) => state.leads.addLead
  );

  const route = useRoute();
  const [id] = useState(route?.params?.slug);
  const dispatch = useAppDispatch();
  const toast = useToast();
  const [selectedData, setSelectedData] = useState<LeadListState | undefined>();
  const [showModal, setShowModal] = useState<Boolean>(false);
  const [countryCodeError, setCountryCodeError] = useState("");
  const [ImageURI, setImageURI] = useState<{
    name?: string;
    fileCopyUri?: string;
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
    console.log(values.phoneNumber, selectedCountryCodeValue);
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
  const requestPermissions = async () => {
    if (Platform.OS === "android") {
      try {
        const result = await request(
          PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
          {
            title: "Storage Permission",
            message: "App needs access to your storage to function properly.",
            buttonNeutral: "Ask Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );
        return result === RESULTS.GRANTED;
      } catch (error) {
        console.error("Error requesting storage permission: ", error);
        return false;
      }
    } else if (Platform.OS === "ios") {
      const granted = await request(PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY, {
        title: t("storagePermission"),
        message: t("storagePermissionDesc"),
        buttonNeutral: t("askLater"),
        buttonNegative: t("cancel"),
        buttonPositive: t("ok"),
      });
      return granted === RESULTS.GRANTED;
    } else {
      return false;
    }
  };

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
    const permissionGranted = await requestPermissions();
    if (permissionGranted) {
      console.log("Storage permission granted");
    } else {
      console.log("Storage permission denied");
    }
    try {
      const res = await DocumentPicker.pick({
        type: [
          DocumentPicker.types.pdf,
          DocumentPicker.types.images,
          DocumentPicker.types.plainText,
        ],
        copyTo: "cachesDirectory",
        allowMultiSelection: true,
      });

      res.forEach((file: any) => {
        if (file.size > MAX_FILE_SIZE) {
          toast.show(t("fileSizeLimitExceed"), {
            type: "customToast",
            data: {
              type: ToastTypeProps.Error,
            },
          });
        } else {
          setDocumentArray((prevImages) => [...prevImages, file]);
        }
      });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log("cancelled");
      } else {
        console.log("error", err);
        throw err;
      }
    }
  };

  const onDeleteActionPress = async () => {
    const deletedDocument = documentArray?.filter(
      (item) => item?.fileCopyUri === deleteDocumentUrl
    );

    const updatedDocuments = documentArray?.filter(
      (item) => item?.fileCopyUri !== deleteDocumentUrl
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
    setDeleteShowModal(false);
    setDocumentArray(updatedDocuments);
  };

  const renderFilePreview = (file: any) => {
    const type = file?.type;
    return (
      <PressAbleContainer
        onPress={() => {
          setImageURI(file);
          setShowModal(true);
        }}>
        <CrossIconContainer
          onPress={() => {
            setDeleteShowModal(true);
            setDeleteDocumentUrl(file?.fileCopyUri);
          }}>
          <CrossIcon color={"#fff"} />
        </CrossIconContainer>
        {type.includes("image") ? (
          <ImagePreviewShow source={{ uri: file?.fileCopyUri }} />
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

  const renderCountryDialCode = (item) => {
    const isSvg = item?.flag.endsWith(".svg");

    return (
      <DialCodeDropDownView>
        {isSvg ? (
          <SvgUri width={16} height={16} uri={item?.flag} />
        ) : (
          <ImageView source={{ uri: item.flag }} />
        )}

        <DialCodeText>{`+${item.label}`}</DialCodeText>
      </DialCodeDropDownView>
    );
  };
  const renderLeftIcon = () => {
    const selectedItem = countryListData.find(
      (item) => item.id === selectedCountryCodeValue
    );
    const isSvg = selectedItem?.flag.endsWith(".svg");
    return (
      <SelectedFlagView pointerEvents="none">
        {selectedItem?.flag &&
          (isSvg ? (
            <SvgUri width={16} height={16} uri={selectedItem?.flag} />
          ) : (
            <ImageView source={{ uri: selectedItem?.flag }} />
          ))}
      </SelectedFlagView>
    );
  };

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
            <FieldDropDownContainer isError={false}>
              <DropDown
                data={countryListData?.map((item) => ({
                  label: item?.dialCode,
                  value: item?.id,
                  flag: item?.flag,
                }))}
                placeholder={t("selectCountry")}
                value={selectedCountryCodeValue}
                onChange={(value: { label: string | number }) => {
                  if (selectedCountryCodeValue !== value?.value) {
                    setSelectedCountryCodeValue(value?.value);
                  } else {
                    setSelectedCountryCodeValue("");
                  }
                }}
                placeholderStyle={{
                  fontSize: 16,
                  color: colors.placeholderTextColor,
                  paddingLeft: 8,
                }}
                renderItem={renderCountryDialCode}
                renderLeftIcon={renderLeftIcon}
              />
            </FieldDropDownContainer>
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
        {countryCodeError && <ErrorText>{countryCodeError}</ErrorText>}
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
            {ImageURI && ImageURI?.fileCopyUri?.endsWith("pdf") ? (
              <>
                <Pdf
                  source={{
                    uri: ImageURI?.fileCopyUri,
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
              <PreviewImageView source={{ uri: ImageURI?.fileCopyUri }} />
            )}
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
