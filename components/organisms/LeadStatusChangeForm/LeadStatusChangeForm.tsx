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
} from '@organisms/BasicInformationForm/BasicInformationForm.styles';
import {
  ContainerView,
  DropdownView,
  FormButtonText,
  InputView,
  RowView,
  SubContainerView,
} from '@organisms/LeadDetailsForm/LeadDetailsForm.styles';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Field, useFormState } from 'react-final-form';
import FieldTextInput from '@molecules/FieldTextInput/FieldTextInput';
import * as DocumentPicker from 'expo-document-picker';
import { Spacer } from '@atoms/common/common.styles';
import { ButtonSubmit } from '@organisms/LoginForm/LoginForm.styles';
import { LeadStatusChangeFormProps } from './LeadStatusChangeForm.props';
import {
  CancelButtonView,
  CancelText,
  FormsView,
} from './LeadStatusChangeForm.styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RootState, useAppDispatch, useSelector } from '@redux/store';
import AddIcon from '@atoms/Illustrations/AddIcon';
import { MAX_FILE_SIZE } from '@utils/constant';
import { ToastType, ToastTypeProps } from '@molecules/Toast/Toast.props';
import { useToast } from 'react-native-toast-notifications';
import DocumentIcon from '@atoms/Illustrations/Document';
import CrossIcon from '@atoms/Illustrations/Cross';
import Pdf from 'react-native-pdf';
import { useAppTheme } from '@constants/theme';
import ActionModal from '@molecules/ActionModal/ActionModal';
import TrashIcon from '@atoms/Illustrations/Trash';
import { Actions } from '@molecules/ActionModal/ActionModal.props';
import {
  deleteLeadDocumentsAction,
  getLeadDetailsAction,
} from '@redux/actions/lead';
import {
  composeValidators,
  numberAndFractionalNumberValidator,
} from '@utils/formValidators';
import * as MediaLibrary from 'expo-media-library';
import { Linking } from 'react-native';
import FieldDropDown from '@organisms/FieldDropDown/FieldDropdown';
import Loader from '@atoms/Loader/Loader';
import DocumentPick from '@molecules/DocumentPicker/DocumentPicker';

const LeadStatusChangeForm: React.FC<LeadStatusChangeFormProps> = ({
  form,
  loading,
  onCancelPress,
  leadCardId,
  setDocuments,
  documents,
}) => {
  const { colors } = useAppTheme();
  const { t: tm } = useTranslation('modalText');
  const { t } = useTranslation('companyInformation');
  const { t: tl } = useTranslation('leadDetails');
  const { t: tb } = useTranslation('formButtonName');
  const { t: tbb } = useTranslation('leadDetailList');
  const toast = useToast();
  const settings = useSelector((state: RootState) => state.general.settings);
  const dispatch = useAppDispatch();
  const currencyList = useSelector(
    (state: RootState) => state.general.currencyList,
  );
  const { valid, values } = useFormState({ subscription: { valid: true } });
  const leadsData = useSelector(
    (state: RootState) => state.leads.leadList.leads,
  );
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteDocumentUrl, setDeleteDocumentUrl] = useState(null);
  const [deleteShowModal, setDeleteShowModal] = useState<Boolean>(false);
  const [leadLoading, setLeadLoading] = useState(false);
  const [ImageURI, setImageURI] = useState<{
    name?: string;
    uri?: string;
  }>({});
  const leadDetails = useSelector(
    (state: RootState) => state.leads.leadsDetail,
  );
  const handleGetLeadsDetails = async () => {
    await dispatch(getLeadDetailsAction({ lead_id: leadCardId }));
  };

  const handleGetLeadDetails = async () => {
    setLeadLoading(true);
    await dispatch(getLeadDetailsAction({ lead_id: leadCardId }));
    setLeadLoading(false);
  };
  useEffect(() => {
    handleGetLeadDetails();
  }, [leadCardId]);
  useEffect(() => {
    setDocuments(leadDetails?.documents);
    form.change('budgetCurrencyCode', leadDetails?.budgetCurrencyCode);
    form.change('timeFrameType', leadDetails?.timeFrameType);
    form.change('budget', leadDetails.budget);
    form.change('budget', `${leadDetails.budget || ''}`);
    form.change('companyName', leadDetails.companyName || '');
    form.change('timeFrame', leadDetails.timeLine || '');
    form.change('webSite', leadDetails.webSite || '');
    handleGetLeadsDetails();
  }, []);
  const onDeleteActionPress = async () => {
    const deletedDocument = documents?.filter(
      (item) => item?.uri === deleteDocumentUrl,
    );

    const updatedDocuments = documents?.filter(
      (item) => item?.uri !== deleteDocumentUrl,
    );

    if (deletedDocument?.[0]?.id) {
      try {
        setDeleteLoading(true);
        const response = await dispatch(
          deleteLeadDocumentsAction({ media_id: deletedDocument?.[0]?.id }),
        ).unwrap();
        toast.show(response?.message, {
          type: ToastType.Custom,
          data: {
            type: ToastTypeProps.Success,
          },
        });
        await dispatch(getLeadDetailsAction({ lead_id: leadCardId }));
      } catch (error: any) {
        toast.show(error, {
          type: ToastType.Custom,
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
      if (status !== 'granted') {
        return;
      }
      const res = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'image/*', 'text/plain'],
        copyToCacheDirectory: true,
      });
      if (!res.canceled) {
        res.assets.forEach((file: any) => {
          if (file.size > MAX_FILE_SIZE) {
            toast.show(t('fileSizeLimitExceed'), {
              type: ToastType.Custom,
              data: {
                type: ToastTypeProps.Error,
              },
            });
          } else {
            setDocuments((prevImages: any) => [...prevImages, file]);
          }
        });
      } else if (res.type === 'cancel') {
        console.log('cancelled');
      }
    } catch (err) {
      console.log('error', err);
      throw err;
    }
  };
  const renderFilePreview = (file: any) => {
    const type = file?.type || file?.mimeType;
    return (
      <PressAbleContainer
        onPress={() => {
          setImageURI(file);
          // setShowModal(true);
          if (file && file?.uri?.endsWith('pdf')) {
            Linking.openURL(file.uri);
          }
        }}>
        <CrossIconContainer
          onPress={() => {
            setDeleteShowModal(true);
            setDeleteDocumentUrl(file?.uri);
          }}>
          <CrossIcon color={colors.white} />
        </CrossIconContainer>
        {type?.includes('image') ? (
          <ImagePreviewShow source={{ uri: file?.uri }} />
        ) : (
          <SvgShowContainer>
            <DocumentIcon />
          </SvgShowContainer>
        )}
      </PressAbleContainer>
    );
  };
  return (
    <>
      {leadLoading ? (
        <Loader color={colors.blueChaos} />
      ) : (
        <FormsView>
          <KeyboardAwareScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="always">
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
            <RowView>
              <DropdownView>
                <Field
                  name={'budgetCurrencyCode'}
                  component={FieldDropDown}
                  listData={currencyList?.map((item) => {
                    return {
                      id: item.id,
                      title: item.currencyCodeAlpha,
                    };
                  })}
                  isShowSelected
                  placeholder={t('budget')}
                />
              </DropdownView>
              <InputView>
                <Field
                  name="budget"
                  placeholder={tl('budgetLabel')}
                  component={FieldTextInput}
                  keyboardType="numeric"
                  isFloatValue
                  validate={composeValidators(
                    numberAndFractionalNumberValidator,
                  )}
                />
              </InputView>
            </RowView>
            <Spacer size={16} />
            <Label>{tl('timeFrameToPurchaseLabel')}</Label>
            <RowView>
              <DropdownView>
                <Field
                  name={'timeFrameType'}
                  component={FieldDropDown}
                  listData={Object.entries(settings?.timeframe).map(
                    ([key, value]) => ({
                      id: key,
                      title: value,
                    }),
                  )}
                  isShowSelected
                  placeholder={t('time')}
                />
              </DropdownView>
              <InputView>
                <Field
                  name="timeFrame"
                  placeholder={`${tbb('timeFrameEg')} ${
                    settings?.timeframe[
                      values?.timeFrameType as string
                    ]?.toLowerCase() || ''
                  }`}
                  component={FieldTextInput}
                />
              </InputView>
            </RowView>
            <Spacer size={16} />
            <Label>{tl('commentsLabel')}</Label>
            <Field
              name="comments"
              placeholder={tl('commentsLabel')}
              component={FieldTextInput}
            />
            <Spacer size={16} />
            <DocumentPick
              setDocumentArray={setDocuments}
              documentArray={documents}
              id={leadCardId}
            />
            {deleteShowModal && (
              <ActionModal
                isModal
                onBackdropPress={() => {
                  setDeleteShowModal(false);
                }}
                heading={tm('discardMedia')}
                description={tm('disCardDescription')}
                label={tm('yesDiscard')}
                actionType={Actions.delete}
                actiontext={tm('cancel')}
                onCancelPress={() => {
                  setDeleteShowModal(false);
                }}
                onActionPress={() => onDeleteActionPress()}
                icon={<TrashIcon color={colors?.deleteColor} />}
                loading={deleteLoading}
              />
            )}
          </KeyboardAwareScrollView>

          <ContainerView>
            <SubContainerView>
              <CancelButtonView onPress={() => onCancelPress?.()}>
                <CancelText>{tb('cancel')}</CancelText>
              </CancelButtonView>
            </SubContainerView>
            <SubContainerView>
              <ButtonSubmit
                onPress={form.submit}
                loading={loading}
                variant={valid}>
                <FormButtonText valid={valid}>{tb('save')}</FormButtonText>
              </ButtonSubmit>
            </SubContainerView>
          </ContainerView>
        </FormsView>
      )}
    </>
  );
};

export default LeadStatusChangeForm;
