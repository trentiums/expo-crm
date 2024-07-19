import AddIcon from '@atoms/Illustrations/AddIcon';
import DocumentPicker from 'react-native-document-picker';
import { Spacer } from '@atoms/common/common.styles';
import FieldTextInput from '@molecules/FieldTextInput/FieldTextInput';
import {
  AddIconButton,
  ButtonSubmit,
  CloseButton,
  CrossIconContainer,
  FormButtonText,
  HeaderText,
  Label,
  ModalView,
  PickerContainer,
  PressAbleContainer,
  PreviewImageView,
  StyledModal,
  SvgShowContainer,
  UploadText,
} from '@organisms/BasicInformatioForm/BasicInformationForm.styles';
import {
  FormsView,
  KeyboardAwareScrollViewContainer,
} from '@organisms/LeadDetailsForm/LeadDetailsForm.styles';
import { composeValidators, requiredValidator } from '@utils/formValidators';
import React, { useEffect, useState } from 'react';
import { Field, useFormState } from 'react-final-form';
import { useTranslation } from 'react-i18next';
import { MAX_FILE_SIZE } from '@utils/constant';
import { useToast } from 'react-native-toast-notifications';
import { ToastTypeProps } from '@molecules/Toast/Toast.props';
import { AddProductFormProps } from './AddProductForm.props';
import { PermissionsAndroid, Platform } from 'react-native';
import CrossIcon from '@atoms/Illustrations/Cross';
import ActionModal from '@molecules/ActionModal/ActionModal';
import Pdf from 'react-native-pdf';
import { Actions } from '@molecules/ActionModal/ActionModal.props';
import Trash from '@atoms/Illustrations/Trash';
import { useAppTheme } from '@constants/theme';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RootState, useAppDispatch, useSelector } from '@redux/store';
import ImageIcon from '@atoms/Illustrations/ImageIcone';
import Document from '@atoms/Illustrations/Document';
import { getProductServiceDetailAction } from '@redux/actions/productService';
import Loader from '@atoms/Loader/Loader';
import { PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import { ImagePreviewShow, LoaderView } from './AddProductForm.styles';

const AddProductForm: React.FC<AddProductFormProps> = ({
  form,
  loading,
  documentArray,
  setDocumentArray,
}) => {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { t } = useTranslation('addProduct');
  const { values, valid } = useFormState();
  const { t: tm } = useTranslation('modalText');
  const { t: tb } = useTranslation('BasicInformation');
  const toast = useToast();
  const { colors } = useAppTheme();
  const [showModal, setShowModal] = useState<Boolean>(false);
  const [ImageURI, setImageURI] = useState<{
    name?: string;
    fileCopyUri?: string;
  }>({});
  const productServiceDetail = useSelector(
    (state: RootState) => state.productService.productServiceDetail,
  );
  const [deleteShowModal, setDeleteShowModal] = useState<Boolean>(false);
  const [deleteDocumentUrl, setDeleteDocumentUrl] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const [isDisable, setIsDisable] = useState(true);
  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: t('storagePermission'),
            message: t('storagePermissionDesc'),
            buttonNeutral: t('askLater'),
            buttonNegative: t('cancel'),
            buttonPositive: t('ok'),
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.error('Error requesting storage permission on Android:', err);
        return false;
      }
    } else if (Platform.OS === 'ios') {
      const granted = await request(PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY, {
        title: t('storagePermission'),
        message: t('storagePermissionDesc'),
        buttonNeutral: t('askLater'),
        buttonNegative: t('cancel'),
        buttonPositive: t('ok'),
      });
      return granted === RESULTS.GRANTED;
    } else {
      return false;
    }
  };
  const handleGetProductServiceData = async () => {
    try {
      setDetailLoading(true);
      await dispatch(
        getProductServiceDetailAction({
          product_service_id: route?.params?.slug,
        }),
      ).unwrap();
    } catch (error) {
      console.log(error);
    }
    setDetailLoading(false);
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (route?.params?.slug) {
        handleGetProductServiceData();
      } else {
        form.reset();
      }
    });
    return unsubscribe;
  }, [route?.params?.slug, navigation]);
  useEffect(() => {
    if (route?.params?.slug) {
      form.change('name', productServiceDetail?.name);
      form.change('description', productServiceDetail?.description);
      setDocumentArray(productServiceDetail?.documents);
    } else {
      setDocumentArray([]);
    }
  }, [route?.params?.slug, productServiceDetail]);
  const onDeleteActionPress = async () => {
    setDocumentArray(null);
    setDeleteShowModal(false);
  };
  const pickFile = async () => {
    await requestPermissions();
    try {
      const res = await DocumentPicker.pick({
        type: [
          DocumentPicker.types.pdf,
          DocumentPicker.types.images,
          DocumentPicker.types.plainText,
        ],
        copyTo: 'cachesDirectory',
      });

      res.forEach((file: any) => {
        if (file.size > MAX_FILE_SIZE) {
          toast.show(t('fileSizeLimitExceed'), {
            type: 'customToast',
            data: {
              type: ToastTypeProps.Error,
            },
          });
        } else {
          setDocumentArray(file);
        }
      });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('cancelled');
      } else {
        console.log('error', err);
        throw err;
      }
    }
  };
  useEffect(() => {
    setIsDisable(true);
  }, [values]);
  const handleAddProducts = () => {
    setIsDisable(false);
    if (!loading) {
      form.submit();
    } else {
      return null;
    }
  };

  return (
    <>
      {detailLoading ? (
        <LoaderView>
          <Loader size={16} />
        </LoaderView>
      ) : (
        <FormsView>
          <KeyboardAwareScrollViewContainer
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="always">
            <Label>{t('name')}</Label>
            <Field
              name="name"
              placeholder={t('nameEg')}
              component={FieldTextInput}
              keyboardType="email-address"
              validate={composeValidators(requiredValidator)}
            />
            <Spacer size={16} />
            <Label>{t('description')}</Label>
            <Field
              name="description"
              placeholder={t('description')}
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
            {!documentArray?.fileCopyUri && (
              <PickerContainer onPress={pickFile}>
                <AddIconButton>
                  <AddIcon />
                  <UploadText>{t('uploadDocuments')}</UploadText>
                </AddIconButton>
              </PickerContainer>
            )}
            {documentArray?.fileCopyUri && (
              <>
                <HeaderText>{tb('attachments')}</HeaderText>
                <Spacer size={8} />

                <PressAbleContainer
                  onPress={() => {
                    setImageURI(documentArray);
                    setShowModal(true);
                  }}
                  style={{ width: '30%' }}>
                  <CrossIconContainer
                    onPress={() => {
                      setDeleteShowModal(true);
                      setDeleteDocumentUrl(documentArray?.fileCopyUri);
                    }}>
                    <CrossIcon color={'#fff'} />
                  </CrossIconContainer>
                  {documentArray?.type.includes?.('image') ? (
                    <ImagePreviewShow
                      source={{ uri: documentArray?.fileCopyUri }}
                    />
                  ) : (
                    <SvgShowContainer>
                      <Document />
                    </SvgShowContainer>
                  )}
                </PressAbleContainer>
              </>
            )}
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
                {ImageURI && ImageURI?.fileCopyUri?.endsWith('pdf') ? (
                  <>
                    <Pdf
                      source={{
                        uri: ImageURI?.fileCopyUri,
                      }}
                      trustAllCerts={false}
                      style={{
                        flex: 1,
                        width: '100%',
                      }}
                      onError={(error) => {
                        console.error(error, 'error');
                      }}
                    />
                  </>
                ) : (
                  <PreviewImageView source={{ uri: ImageURI?.fileCopyUri }} />
                )}
              </ModalView>
            </StyledModal>
          </KeyboardAwareScrollViewContainer>
          <ButtonSubmit
            onPress={handleAddProducts}
            loading={loading}
            valid={valid}>
            <FormButtonText valid={valid}>{t('save')}</FormButtonText>
          </ButtonSubmit>
        </FormsView>
      )}
    </>
  );
};

export default AddProductForm;
