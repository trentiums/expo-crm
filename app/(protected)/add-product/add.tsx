import { ToastType, ToastTypeProps } from '@molecules/Toast/Toast.props';
import AddProductForm from '@organisms/AddProductForm/AddProductForm';
import { AddProductFormValues } from '@organisms/AddProductForm/AddProductForm.props';
import { fileSystemProps } from '@organisms/BasicInformationForm/BasicInformationForm.props';
import {
  addProductServiceAction,
  getProductServiceListAction,
} from '@redux/actions/productService';
import { useAppDispatch } from '@redux/store';
import FormTemplate from '@templates/FormTemplate/FormTemplate';
import ScreenTemplate from '@templates/ScreenTemplate/ScreenTemplate';
import { router, useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { useToast } from 'react-native-toast-notifications';
import { AddProductContainer } from '../(tabs)/drawer.style';
import { useTranslation } from 'react-i18next';
import { useAppTheme } from '@constants/theme';

const addProducts = () => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const navigation = useNavigation();
  const { t } = useTranslation('screenTitle');
  const [loading, setLoading] = useState(false);
  const [documentArray, setDocumentArray] = useState<fileSystemProps[]>([]);
  const { colors } = useAppTheme();
  const handleAddServices = async (values: AddProductFormValues) => {
    try {
      setLoading(true);
      let formData = new FormData();
      formData.append('name', values?.name || '');
      formData.append('description', values?.description || '');
      if (documentArray.length > 0) {
        documentArray.forEach((document, index) => {
          formData.append(`documents[${index}]`, {
            uri: document.uri,
            name: document.name,
            type: document.mimeType || document.type,
          });
        });
      }
      const response = await dispatch(
        addProductServiceAction(formData),
      ).unwrap();
      await dispatch(getProductServiceListAction({}));
      setDocumentArray([]);

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
  useEffect(() => {
    navigation.setOptions({
      title: t('addProduct'),
      headerStyle: {
        backgroundColor: colors.tabBar,
      },
      headerTintColor: colors.white,
    });
  }, [navigation]);
  return (
    <ScreenTemplate title={t('addProduct')}>
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
