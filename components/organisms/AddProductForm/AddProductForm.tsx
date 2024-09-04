import * as DocumentPicker from 'expo-document-picker';
import { Spacer } from '@atoms/common/common.styles';
import FieldTextInput from '@molecules/FieldTextInput/FieldTextInput';
import {
  AddIconButton,
  ButtonSubmit,
  CrossIconContainer,
  FormButtonText,
  HeaderText,
  Label,
  PickerContainer,
  PressAbleContainer,
  SvgShowContainer,
  UploadText,
} from '@organisms/BasicInformatioForm/BasicInformationForm.styles';
import { KeyboardAwareScrollViewContainer } from '@organisms/LeadDetailsForm/LeadDetailsForm.styles';
import { composeValidators, requiredValidator } from '@utils/formValidators';
import React, { useEffect, useState } from 'react';
import { Field, useFormState } from 'react-final-form';
import { useTranslation } from 'react-i18next';
import { MAX_FILE_SIZE } from '@utils/constant';
import { useToast } from 'react-native-toast-notifications';
import { ToastTypeProps } from '@molecules/Toast/Toast.props';
import { AddProductFormProps } from './AddProductForm.props';
import CrossIcon from '@atoms/Illustrations/Cross';
import ActionModal from '@molecules/ActionModal/ActionModal';
import { Actions } from '@molecules/ActionModal/ActionModal.props';
import TrashIcon from '@atoms/Illustrations/Trash';
import { useAppTheme } from '@constants/theme';
import { RootState, useAppDispatch, useSelector } from '@redux/store';
import DocumentIcon from '@atoms/Illustrations/Document';
import { getProductServiceDetailAction } from '@redux/actions/productService';
import Loader from '@atoms/Loader/Loader';
import * as MediaLibrary from 'expo-media-library';
import {
  FormsView,
  ImagePreviewShow,
  LoaderView,
} from './AddProductForm.styles';
import { useLocalSearchParams } from 'expo-router';
import { Linking } from 'react-native';
import UploadCon from '@atoms/Illustrations/UploadCon';
import DocumentPick from '@molecules/DocumentPicker/DocumentPicker';

const AddProductForm: React.FC<AddProductFormProps> = ({
  form,
  loading,
  documentArray,
  setDocumentArray,
}) => {
  const dispatch = useAppDispatch();
  const params = useLocalSearchParams();
  const { t } = useTranslation('addProduct');
  const { values, valid } = useFormState();
  const { colors } = useAppTheme();
  const productServiceDetail = useSelector(
    (state: RootState) => state.productService.productServiceDetail,
  );
  const [detailLoading, setDetailLoading] = useState(false);
  const [isDisable, setIsDisable] = useState(true);

  const handleGetProductServiceData = async () => {
    try {
      setDetailLoading(true);
      await dispatch(
        getProductServiceDetailAction({
          product_service_id: +params?.slug,
        }),
      ).unwrap();
    } catch (error) {
      console.log(error);
    }
    setDetailLoading(false);
  };
  useEffect(() => {
    if (params?.slug) {
      handleGetProductServiceData();
    } else {
      form.reset();
    }
  }, [params?.slug]);
  useEffect(() => {
    if (params?.slug) {
      form.change('name', productServiceDetail?.name);
      form.change('description', productServiceDetail?.description);
      console.log(
        productServiceDetail?.documents,
        'productServiceDetail?.documents',
      );
      productServiceDetail?.documents?.id &&
        setDocumentArray([productServiceDetail?.documents]);
    } else {
      setDocumentArray([]);
    }
  }, [params?.slug, productServiceDetail]);

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
              placeholder={t('descriptionEg')}
              component={FieldTextInput}
              numberOfLines={8}
              style={{
                height: 100,
                backgroundColor: colors?.IcewindDale,
              }}
              multiline
              contentStyle={{ marginTop: -10 }}
            />
            <Spacer size={16} />
            <DocumentPick
              setDocumentArray={setDocumentArray}
              documentArray={documentArray}
            />
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
