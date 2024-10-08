import { ToastType, ToastTypeProps } from '@molecules/Toast/Toast.props';
import AddProductForm from '@organisms/AddProductForm/AddProductForm';
import { AddProductFormValues } from '@organisms/AddProductForm/AddProductForm.props';
import { FileSystemProps } from '@organisms/BasicInformationForm/BasicInformationForm.props';
import {
  addProductServiceAction,
  editProductServiceAction,
  getProductServiceDetailAction,
  getProductServiceListAction,
} from '@redux/actions/productService';
import { useAppDispatch } from '@redux/store';
import FormTemplate from '@templates/FormTemplate/FormTemplate';
import ScreenTemplate from '@templates/ScreenTemplate/ScreenTemplate';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { useToast } from 'react-native-toast-notifications';
import { AddProductContainer } from '../(tabs)/drawer.style';
import { useTranslation } from 'react-i18next';
import { useAppTheme } from '@constants/theme';

const addProducts = () => {
  const params = useLocalSearchParams();
  const dispatch = useAppDispatch();
  const { colors } = useAppTheme();
  const toast = useToast();
  const navigation = useNavigation();
  const { t } = useTranslation('screenTitle');
  const [loading, setLoading] = useState(false);
  const [documentArray, setDocumentArray] = useState<FileSystemProps[]>([]);

  const handleAddServices = async (values: AddProductFormValues) => {
    try {
      setLoading(true);
      let formData = new FormData();
      if (params?.slug) {
        formData.append(`product_service_id`, `${params?.slug}`);
      }
      formData.append('name', values?.name || '');
      formData.append('description', values?.description || '');
      const newDocumentsArray = documentArray?.filter((item) => !item.id);
      if (newDocumentsArray?.length > 0) {
        newDocumentsArray.forEach((document, index) => {
          formData.append(`documents[${index}]`, {
            uri: document.uri,
            name: document.name,
            type: document.mimeType,
          });
        });
      }

      let response;
      if (params?.slug) {
        response = await dispatch(editProductServiceAction(formData)).unwrap();
        await dispatch(
          getProductServiceDetailAction({
            product_service_id: +params?.slug,
          }),
        );
      } else {
        response = await dispatch(addProductServiceAction(formData)).unwrap();
        await dispatch(getProductServiceListAction({}));
        setDocumentArray([]);
      }
      toast.show(response?.message, {
        type: ToastType.Custom,
        data: {
          type: ToastTypeProps.Success,
        },
      });

      router.navigate('/products');
    } catch (error) {
      toast.show(error, {
        type: ToastType.Custom,
        data: {
          type: ToastTypeProps.Error,
        },
      });
    }
    setLoading(false);
  };

  return (
    <ScreenTemplate title={t('editProducts')}>
      <AddProductContainer>
        <FormTemplate
          Component={AddProductForm}
          onSubmit={(values: AddProductFormValues) => {
            handleAddServices(values);
          }}
          setDocumentArray={setDocumentArray}
          documentArray={documentArray}
          loading={loading}
        />
      </AddProductContainer>
    </ScreenTemplate>
  );
};

export default addProducts;
