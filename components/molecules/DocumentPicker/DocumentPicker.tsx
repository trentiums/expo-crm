import React, { useState } from 'react';
import {
  AddIconButton,
  DocumentDetailContainer,
  DocumentInfoContainer,
  DocumentName,
  DocumentView,
  FlatListCon,
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
import { deleteLeadDocumentsAction } from '@redux/actions/lead';
import { useAppDispatch } from '@redux/store';
import { Actions } from '@molecules/ActionModal/ActionModal.props';
import { Pressable } from 'react-native';
import Delete from '@atoms/Illustrations/Delete';
import Plus from '@atoms/Illustrations/Plus';
import TrashIcon from '@atoms/Illustrations/Trash';
import TaskIcon from '@atoms/Illustrations/Task';
import { useAppTheme } from '@constants/theme';
import { HeaderText } from '@organisms/BasicInformationForm/BasicInformationForm.styles';

const DocumentPick: React.FC<DocumentPickerProps> = ({
  setDocumentArray,
  documentArray,
}) => {
  const { t } = useTranslation('addProduct');
  const { t: tb } = useTranslation('BasicInformation');
  const { t: tm } = useTranslation('modalText');
  const dispatch = useAppDispatch();
  const toast = useToast();
  const { colors } = useAppTheme();
  const [deleteDocumentUrl, setDeleteDocumentUrl] = useState(null);
  const [deleteShowModal, setDeleteShowModal] = useState<Boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
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
        console.log('cancelled');
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
            setDeleteShowModal(true);
            setDeleteDocumentUrl(file?.uri);
          }}>
          <Delete color={colors.roseMadder} />
        </Pressable>
      </DocumentDetailContainer>
    );
  };
  const onDeleteActionPress = async () => {
    const deletedDocument = documentArray?.filter(
      (item) => item?.uri === deleteDocumentUrl,
    );

    const updatedDocuments = documentArray?.filter(
      (item) => item?.uri !== deleteDocumentUrl,
    );

    if (deletedDocument?.[0]?.id) {
      try {
        setDeleteLoading(true);
        const response = await dispatch(
          deleteLeadDocumentsAction({ media_id: deletedDocument[0].id }),
        ).unwrap();
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
      setDeleteLoading(false);
    }
    setDeleteShowModal(false);
    setDocumentArray(updatedDocuments);
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
          <FlatListCon
            data={documentArray}
            renderItem={({ item }) => (
              <DocumentView>{renderFilePreview(item)}</DocumentView>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
          <Spacer size={8} />
          <Pressable onPress={pickFile}>
            <DocumentInfoContainer>
              <Plus />
              <UploadAnotherDocumentText>
                {t('uploadAnotherDocument')}
              </UploadAnotherDocumentText>
            </DocumentInfoContainer>
          </Pressable>
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
          loading={deleteLoading}
          icon={<TrashIcon />}
        />
      )}
    </>
  );
};

export default DocumentPick;
