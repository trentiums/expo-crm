import AddIcon from '@atoms/Illustrations/AddIcon';
import DocumentPicker from 'react-native-document-picker';
import { Spacer } from '@atoms/common/common.styles';
import FieldTextInput from '@molecules/FieldTextInput/FieldTextInput';
import {
  AddIconButton,
  ButtonSubmit,
  CloseButton,
  CrossIconContainer,
  DocumentView,
  FlatListCon,
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
import React, { useState } from 'react';
import { Field, useFormState } from 'react-final-form';
import { useTranslation } from 'react-i18next';
import { MAX_FILE_SIZE } from '@utils/constant';
import { useToast } from 'react-native-toast-notifications';
import { ToastTypeProps } from '@molecules/Toast/Toast.props';
import { AddProductFormProps } from './AddProductForm.props';
import { PermissionsAndroid, Platform } from 'react-native';
import CrossIcon from '@atoms/Illustrations/Cross';
import ImageIcon from '@atoms/Illustrations/ImageIcone';
import Document from '@atoms/Illustrations/Document';
import ActionModal from '@molecules/ActionModal/ActionModal';
import Pdf from 'react-native-pdf';
import { Actions } from '@molecules/ActionModal/ActionModal.props';
import Trash from '@atoms/Illustrations/Trash';
import { useAppTheme } from '@constants/theme';

const AddProductForm: React.FC<AddProductFormProps> = ({
  form,
  loading,
  documentArray,
  setDocumentArray,
}) => {
  const { t } = useTranslation('addProduct');
  const { values, valid } = useFormState();
  const { t: tm } = useTranslation('modalText');
  const toast = useToast();
  const { colors } = useAppTheme();
  const [showModal, setShowModal] = useState<Boolean>(false);
  const [ImageURI, setImageURI] = useState<{
    name?: string;
    fileCopyUri?: string;
  }>({});
  const [deleteShowModal, setDeleteShowModal] = useState<Boolean>(false);
  const [deleteDocumentUrl, setDeleteDocumentUrl] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
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
      //TODO: set code for request permission in IOS
    } else {
      return false;
    }
  };
  const onDeleteActionPress = async () => {
    const updatedDocuments = documentArray?.filter(
      (item) => item?.fileCopyUri !== deleteDocumentUrl,
    );
    setDocumentArray(updatedDocuments);
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
          setDocumentArray((prevImages) => [...prevImages, file]);
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
          <CrossIcon color={'#fff'} />
        </CrossIconContainer>
        <SvgShowContainer>
          {type.includes('image') ? <ImageIcon /> : <Document />}
        </SvgShowContainer>
      </PressAbleContainer>
    );
  };

  return (
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
        />
        <Spacer size={16} />
        {documentArray?.length === 0 && (
          <PickerContainer>
            <AddIconButton onPress={pickFile}>
              <AddIcon />
              <UploadText>{t('uploadDocuments')}</UploadText>
            </AddIconButton>
          </PickerContainer>
        )}
        {documentArray?.length > 0 && (
          <>
            <HeaderText>{t('attachments')}</HeaderText>
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
      <ButtonSubmit onPress={form.submit} loading={loading} valid={valid}>
        <FormButtonText valid={valid}>{t('save')}</FormButtonText>
      </ButtonSubmit>
    </FormsView>
  );
};

export default AddProductForm;
