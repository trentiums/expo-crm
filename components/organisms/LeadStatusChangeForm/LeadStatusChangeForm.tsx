import {
  AddIconButton,
  CloseButton,
  CrossIconContainer,
  DocumentView,
  FlatListCon,
  HeaderText,
  ImagePreviewShow,
  Label,
  ModalView,
  PickerContainer,
  PressAbleContainer,
  PreviewImageView,
  StyledModal,
  SvgShowContainer,
  UploadText,
} from "@organisms/BasicInformatioForm/BasicInformationForm.styles";
import {
  ContainerView,
  FormButtonText,
  SubContainerView,
} from "@organisms/LeadDetailsForm/LeadDetailsForm.styles";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Field, useFormState } from "react-final-form";
import FieldTextInput from "@molecules/FieldTextInput/FieldTextInput";
import * as DocumentPicker from "expo-document-picker";
import { Spacer } from "@atoms/common/common.styles";
import { ButtonSubmit } from "@organisms/LoginForm/LoginForm.styles";
import { LeadStatusChangeFormProps } from "./LeadStatusChangeForm.props";
import {
  CancelButtonView,
  CancelText,
  FormsView,
} from "./LeadStatusChangeForm.styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { RootState, useAppDispatch, useSelector } from "@redux/store";
import AddIcon from "@atoms/Illustrations/AddIcon";
import { MAX_FILE_SIZE } from "@utils/constant";
import { ToastTypeProps } from "@molecules/Toast/Toast.props";
import { useToast } from "react-native-toast-notifications";
import Document from "@atoms/Illustrations/Document";
import CrossIcon from "@atoms/Illustrations/Cross";
import Pdf from "react-native-pdf";
import { useAppTheme } from "@constants/theme";
import ActionModal from "@molecules/ActionModal/ActionModal";
import Trash from "@atoms/Illustrations/Trash";
import { Actions } from "@molecules/ActionModal/ActionModal.props";
import {
  deleteLeadDocumentsAction,
  getLeadDetailsAction,
} from "@redux/actions/lead";
import {
  composeValidators,
  numberAndFractionalNumberValidator,
} from "@utils/formValidators";
import * as MediaLibrary from "expo-media-library";
import { Linking } from "react-native";

const LeadStatusChangeForm: React.FC<LeadStatusChangeFormProps> = ({
  form,
  loading,
  onCancelPress,
  leadCardId,
  setDocuments,
  documents,
}) => {
  const { colors } = useAppTheme();
  const { t: tm } = useTranslation("modalText");
  const { t } = useTranslation("companyInformation");
  const { t: tl } = useTranslation("leadDetails");
  const { t: tb } = useTranslation("formButtonName");
  const { t: tbb } = useTranslation("BasicInformation");
  const toast = useToast();
  const dispatch = useAppDispatch();
  const { valid } = useFormState({ subscription: { valid: true } });
  const leadsData = useSelector(
    (state: RootState) => state.leads.leadList.leads
  );
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteDocumentUrl, setDeleteDocumentUrl] = useState(null);
  const [deleteShowModal, setDeleteShowModal] = useState<Boolean>(false);
  const [showModal, setShowModal] = useState<Boolean>(false);
  const [ImageURI, setImageURI] = useState<{
    name?: string;
    uri?: string;
  }>({});
  const data = leadsData?.filter((item) => item?.id === +leadCardId);
  const handleGetLeadsDetails = async () => {
    await dispatch(getLeadDetailsAction({ lead_id: leadCardId }));
  };
  useEffect(() => {
    setDocuments(data?.[0]?.documents);
    form.change("budget", data?.[0]?.budget);
    form.change("budget", `${data?.[0]?.budget || ""}`);
    form.change("companyName", data?.[0]?.companyName || "");
    form.change("timeFrame", data?.[0]?.timeLine || "");
    form.change("webSite", data?.[0]?.webSite || "");
    handleGetLeadsDetails();
  }, []);
  const onDeleteActionPress = async () => {
    const deletedDocument = documents?.filter(
      (item) => item?.uri === deleteDocumentUrl
    );

    const updatedDocuments = documents?.filter(
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
        await dispatch(getLeadDetailsAction({ lead_id: leadCardId }));
      } catch (error: any) {
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
    setDocuments(updatedDocuments);
  };
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
      if (!res.canceled) {
        res.assets.forEach((file: any) => {
          if (file.size > MAX_FILE_SIZE) {
            toast.show(t("fileSizeLimitExceed"), {
              type: "customToast",
              data: {
                type: ToastTypeProps.Error,
              },
            });
          } else {
            setDocuments((prevImages: any) => [...prevImages, file]);
          }
        });
      } else if (res.type === "cancel") {
        console.log("cancelled");
      }
    } catch (err) {
      console.log("error", err);
      throw err;
    }
  };
  const renderFilePreview = (file: any) => {
    const type = file?.type;
    return (
      <PressAbleContainer
        onPress={() => {
          setImageURI(file);
          // setShowModal(true);
          if (file && file?.uri?.endsWith("pdf")) {
            Linking.openURL(file.uri);
          }
        }}>
        <CrossIconContainer
          onPress={() => {
            setDeleteShowModal(true);
            setDeleteDocumentUrl(file?.uri);
          }}>
          <CrossIcon color={"#fff"} />
        </CrossIconContainer>
        {type.includes("image") ? (
          <ImagePreviewShow source={{ uri: file?.uri }} />
        ) : (
          <SvgShowContainer>
            <Document />
          </SvgShowContainer>
        )}
      </PressAbleContainer>
    );
  };
  return (
    <FormsView>
      <KeyboardAwareScrollView
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
        <Label>{t("websiteLabel")}</Label>
        <Field
          name="webSite"
          placeholder={t("websiteLabel")}
          component={FieldTextInput}
        />
        <Spacer size={16} />
        <Label>{tl("budgetLabel")}</Label>
        <Field
          name="budget"
          placeholder={tl("budgetLabel")}
          component={FieldTextInput}
          keyboardType="numeric"
          isFloatValue
          validate={composeValidators(numberAndFractionalNumberValidator)}
        />
        <Spacer size={16} />
        <Label>{tl("timeFrameToPurchaseLabel")}</Label>
        <Field
          name="timeFrame"
          placeholder={tl("timeFrameToPurchaseEg")}
          component={FieldTextInput}
        />
        <Spacer size={16} />
        <Label>{tl("commentsLabel")}</Label>
        <Field
          name="comments"
          placeholder={tl("commentsLabel")}
          component={FieldTextInput}
        />
        <Spacer size={16} />
        <PickerContainer onPress={pickFile}>
          <AddIconButton>
            <AddIcon />
            <UploadText>{tbb("uploadDocuments")}</UploadText>
          </AddIconButton>
        </PickerContainer>
        {documents?.length > 0 && (
          <>
            <HeaderText>{tbb("attachments")}</HeaderText>
            <Spacer size={8} />
            <FlatListCon
              data={documents}
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
        {/* <StyledModal
          animationType="slide"
          transparent={true}
          onRequestClose={() => setShowModal(false)}
          visible={showModal}>
          <ModalView>
            <CloseButton onPress={() => setShowModal(false)}>
              <CrossIcon color={colors.black} />
            </CloseButton>
            <Spacer size={64} />
            {ImageURI && ImageURI?.uri?.endsWith("pdf") ? (
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
            )}
          </ModalView>
        </StyledModal> */}
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

export default LeadStatusChangeForm;
