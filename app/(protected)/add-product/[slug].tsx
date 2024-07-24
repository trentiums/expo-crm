import { ToastTypeProps } from "@molecules/Toast/Toast.props";
import AddProductForm from "@organisms/AddProductForm/AddProductForm";
import { AddProductFormValues } from "@organisms/AddProductForm/AddProductForm.props";
import { fileSystemProps } from "@organisms/BasicInformatioForm/BasicInformationForm.props";
import {
  addProductServiceAction,
  editProductServiceAction,
  getProductServiceDetailAction,
  getProductServiceListAction,
} from "@redux/actions/productService";
import { useAppDispatch } from "@redux/store";
import FormTemplate from "@templates/FormTemplate/FormTemplate";
import ScreenTemplate from "@templates/ScreenTemplate/ScreenTemplate";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Platform } from "react-native";
import { useToast } from "react-native-toast-notifications";
import { AddProductContainer } from "../(drawer)/drawer.style";

const addProducts = () => {
  const params = useLocalSearchParams();
  const dispatch = useAppDispatch();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [documentArray, setDocumentArray] = useState<fileSystemProps>();

  const handleAddServices = async (values: AddProductFormValues) => {
    try {
      setLoading(true);
      let formData = new FormData();
      if (params?.slug) {
        formData.append(`product_service_id`, +params?.slug);
      }
      formData.append("name", values?.name || "");
      formData.append("description", values?.description || "");
      console.log(documentArray, "documents array");

      if (documentArray?.uri) {
        formData.append("documents", {
          uri: documentArray.uri,
          name: documentArray.name,
          type: documentArray.mimeType,
        });
      }

      let response;
      if (params?.slug) {
        response = await dispatch(editProductServiceAction(formData)).unwrap();
        await dispatch(
          getProductServiceDetailAction({
            product_service_id: params?.slug,
          })
        );
      } else {
        response = await dispatch(addProductServiceAction(formData)).unwrap();
        await dispatch(getProductServiceListAction({}));
        setDocumentArray({});
      }
      toast.show(response?.message, {
        type: "customToast",
        data: {
          type: ToastTypeProps.Success,
        },
      });

      router.navigate("/products");
    } catch (error) {
      toast.show(error, {
        type: "customToast",
        data: {
          type: ToastTypeProps.Error,
        },
      });
    }
    setLoading(false);
  };

  return (
    <ScreenTemplate>
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
