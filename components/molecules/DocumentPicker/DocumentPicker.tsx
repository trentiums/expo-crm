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
import { ToastTypeProps } from '@molecules/Toast/Toast.props';
import { useTranslation } from 'react-i18next';
import { DocumentPickerProps } from './DocumentPicker.props';
import { HeaderText } from '@organisms/BasicInformatioForm/BasicInformationForm.styles';
import { Spacer } from '@atoms/common/common.styles';
import ActionModal from '@molecules/ActionModal/ActionModal';
import { deleteLeadDocumentsAction } from '@redux/actions/lead';
import { useAppDispatch } from '@redux/store';
import { Actions } from '@molecules/ActionModal/ActionModal.props';
import { Pressable } from 'react-native';
import Delete from '@atoms/Illustrations/Delete';
import Plus from '@atoms/Illustrations/Plus';
import Trash from '@atoms/Illustrations/Trash';
import Task from '@atoms/Illustrations/Task';
import { useAppTheme } from '@constants/theme';

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
      if (status !== 'granted') {
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
              type: 'customToast',
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
          <Task />
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
          deleteLeadDocumentsAction({ media_id: deletedDocument?.[0]?.id }),
        ).unwrap();
        toast.show(response?.message, {
          type: 'customToast',
          data: {
            type: ToastTypeProps.Success,
          },
        });
      } catch (error) {
        toast.show(error, {
          type: 'customToast',
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
        </>
      )}
      {documentArray?.length > 0 && (
        <>
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
          icon={<Trash />}
        />
      )}
    </>
  );
};

export default DocumentPick;
