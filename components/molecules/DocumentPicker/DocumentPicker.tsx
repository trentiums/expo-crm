import React, { useState } from 'react';
import {
  AddIconButton,
  DocumentDetailContainer,
  DocumentInfoContainer,
  DocumentName,
  DocumentView,
  PickerContainer,
  UploadAnotherDocumentText,
  UploadText,
} from './DocumentPicker.styles';
import * as DocumentPicker from 'expo-document-picker';
import UploadCon from '@atoms/Illustrations/UploadCon';
import * as MediaLibrary from 'expo-media-library';
import { MAX_FILE_SIZE } from '@utils/constant';
import { useToast } from 'react-native-toast-notifications';
import { ToastType, ToastTypeProps } from '@molecules/Toast/Toast.props';
import { useTranslation } from 'react-i18next';
import { DocumentPickerProps, PermissionType } from './DocumentPicker.props';
import { Spacer } from '@atoms/common/common.styles';
import ActionModal from '@molecules/ActionModal/ActionModal';
import {
  deleteLeadDocumentsAction,
  getLeadDetailsAction,
} from '@redux/actions/lead';
import { useAppDispatch } from '@redux/store';
import { Actions } from '@molecules/ActionModal/ActionModal.props';
import { FlatList, Pressable } from 'react-native';
import DeleteIcon from '@atoms/Illustrations/Delete';
import PlusIcon from '@atoms/Illustrations/Plus';
import TrashIcon from '@atoms/Illustrations/Trash';
import TaskIcon from '@atoms/Illustrations/Task';
import { useAppTheme } from '@constants/theme';
import { HeaderText } from '@organisms/BasicInformationForm/BasicInformationForm.styles';
import {
  deleteProductServiceDocumentsAction,
  getProductServiceDetailAction,
} from '@redux/actions/productService';
import { getUserDetailAction } from '@redux/actions/user';

const DocumentPick: React.FC<DocumentPickerProps> = ({
  setDocumentArray,
  documentArray,
  isProductServices,
  id,
}) => {
  const { t } = useTranslation('addProduct');
  const { t: tb } = useTranslation('BasicInformation');
  const { t: tm } = useTranslation('modalText');
  const dispatch = useAppDispatch();
  const toast = useToast();
  const { colors } = useAppTheme();
  const [deleteDocumentUrl, setDeleteDocumentUrl] = useState(null);
  const [visibleDeleteModal, setVisibleDeleteModal] = useState<Boolean>(false);
  const [deleteLoader, setDeleteLoader] = useState(false);
  const pickFile = async () => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== PermissionType.Granted) {
        return;
      }
      const res = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'image/*', 'text/plain'],
        copyToCacheDirectory: true,
      });

      if (!res.canceled) {
        res.assets.forEach((file) => {
          if (file.size > MAX_FILE_SIZE) {
            toast.show(t('fileSizeExceeded'), {
              type: ToastType.Custom,
              data: {
                type: ToastTypeProps.Error,
              },
            });
          } else {
            setDocumentArray((prevImages) => [...prevImages, file]);
          }
        });
      } else {
        toast.show(t('canceled'), {
          type: ToastType.Custom,
          data: {
            type: ToastTypeProps.Error,
          },
        });
      }
    } catch (err) {
      console.log('error', err);
      throw err;
    }
  };

  const renderFilePreview = (file: any) => {
    return (
      <DocumentDetailContainer>
        <DocumentInfoContainer>
          <TaskIcon />
          <DocumentName numberOfLines={1}>{file?.name}</DocumentName>
        </DocumentInfoContainer>
        <Pressable
          onPress={() => {
            setVisibleDeleteModal(true);
            setDeleteDocumentUrl(file?.uri);
          }}>
          <DeleteIcon color={colors.roseMadder} />
        </Pressable>
      </DocumentDetailContainer>
    );
  };
  const onDeleteActionPress = async () => {
    if (documentArray?.length > 0) {
      const deletedDocument = documentArray.filter(
        (item) => item?.uri === deleteDocumentUrl,
      );

      const updatedDocuments = documentArray.filter(
        (item) => item?.uri !== deleteDocumentUrl,
      );

      if (deletedDocument[0].id) {
        try {
          setDeleteLoader(true);

          const response = isProductServices
            ? await dispatch(
                deleteProductServiceDocumentsAction({
                  media_id: deletedDocument[0].id,
                }),
              ).unwrap()
            : await dispatch(
                deleteLeadDocumentsAction({ media_id: deletedDocument[0].id }),
              ).unwrap();
          isProductServices
            ? await dispatch(
                getProductServiceDetailAction({ product_service_id: id }),
              )
            : dispatch(getLeadDetailsAction({ lead_id: id }));
          toast.show(response?.message, {
            type: ToastType.Custom,
            data: {
              type: ToastTypeProps.Success,
            },
          });
        } catch (error) {
          toast.show(error, {
            type: ToastType.Custom,
            data: {
              type: ToastTypeProps.Error,
            },
          });
        }
        setDeleteLoader(false);
      }
      setVisibleDeleteModal(false);
      setDocumentArray(updatedDocuments);
    }
  };
  return (
    <>
      {documentArray?.length === 0 && (
        <PickerContainer onPress={pickFile}>
          <AddIconButton>
            <UploadCon />
            <UploadText>{t('uploadDocuments')}</UploadText>
          </AddIconButton>
        </PickerContainer>
      )}

      {documentArray?.length > 0 && (
        <>
          <Spacer size={8} />
          <HeaderText>{tb('attachments')}</HeaderText>
          <Spacer size={16} />
          <FlatList
            data={documentArray}
            renderItem={({ item }) => (
              <DocumentView>{renderFilePreview(item)}</DocumentView>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
          <Spacer size={8} />
          <Pressable onPress={pickFile}>
            <DocumentInfoContainer>
              <PlusIcon />
              <UploadAnotherDocumentText>
                {t('uploadAnotherDocument')}
              </UploadAnotherDocumentText>
            </DocumentInfoContainer>
          </Pressable>
        </>
      )}

      {visibleDeleteModal && (
        <ActionModal
          isModal
          onBackdropPress={() => {
            setVisibleDeleteModal(false);
          }}
          heading={tm('discardMedia')}
          description={tm('disCardDescription')}
          label={tm('yesDiscard')}
          actionType={Actions.delete}
          actiontext={tm('cancel')}
          onCancelPress={() => {
            setVisibleDeleteModal(false);
          }}
          onActionPress={() => onDeleteActionPress()}
          loading={deleteLoader}
          icon={<TrashIcon />}
        />
      )}
    </>
  );
};

export default DocumentPick;
