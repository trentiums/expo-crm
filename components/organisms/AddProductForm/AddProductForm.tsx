import { Spacer } from '@atoms/common/common.styles';
import FieldTextInput from '@molecules/FieldTextInput/FieldTextInput';
import {
  ButtonSubmit,
  FormButtonText,
  Label,
} from '@organisms/BasicInformationForm/BasicInformationForm.styles';
import { KeyboardAwareScrollViewContainer } from '@organisms/LeadDetailsForm/LeadDetailsForm.styles';
import { composeValidators, requiredValidator } from '@utils/formValidators';
import React, { useEffect, useState } from 'react';
import { Field, useFormState } from 'react-final-form';
import { useTranslation } from 'react-i18next';
import { AddProductFormProps } from './AddProductForm.props';
import { useAppTheme } from '@constants/theme';
import { RootState, useAppDispatch, useSelector } from '@redux/store';
import { getProductServiceDetailAction } from '@redux/actions/productService';
import Loader from '@atoms/Loader/Loader';
import { FormView, LoaderView } from './AddProductForm.styles';
import { useLocalSearchParams } from 'expo-router';
import DocumentsPicker from '@molecules/DocumentPicker/DocumentPicker';

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
      productServiceDetail?.documents &&
        setDocumentArray(productServiceDetail?.documents);
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
        <FormView>
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
                backgroundColor: colors?.iceWindDale,
              }}
              multiline
              contentStyle={{ marginTop: -10 }}
            />
            <Spacer size={16} />
            <DocumentsPicker
              setDocumentArray={setDocumentArray}
              documentArray={documentArray}
              isProductServices
              id={+params?.slug}
            />
          </KeyboardAwareScrollViewContainer>
          <ButtonSubmit
            onPress={handleAddProducts}
            loading={loading}
            valid={valid}>
            <FormButtonText valid={valid}>{t('save')}</FormButtonText>
          </ButtonSubmit>
        </FormView>
      )}
    </>
  );
};

export default AddProductForm;
