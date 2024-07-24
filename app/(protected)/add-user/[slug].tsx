import { PaddingSpace, Spacer } from "@atoms/common/common.styles";
import { ToastTypeProps } from "@molecules/Toast/Toast.props";
import UserInformationForm from "@organisms/UserInformationForm/UserInformationForm";
import { UserInformationFormValues } from "@organisms/UserInformationForm/UserInformationForm.props";
import {
  addUserAction,
  getUserDetailAction,
  getUserListAction,
  updateUserAction,
} from "@redux/actions/user";
import { useAppDispatch } from "@redux/store";
import FormTemplate from "@templates/FormTemplate/FormTemplate";
import ScreenTemplate from "@templates/ScreenTemplate/ScreenTemplate";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { useToast } from "react-native-toast-notifications";

const addUser = () => {
  const toast = useToast();
  const dispatch = useAppDispatch();
  const params = useLocalSearchParams();
  console.log(params, "params");
  const [slug] = useState(params?.slug);
  console.log(slug, "slug");
  const [loading, setLoading] = useState(false);
  const onUserInformationSubmitPress = async (
    values: UserInformationFormValues
  ) => {
    console.log(slug, "slug");
    try {
      setLoading(true);
      const response = slug
        ? await dispatch(
            updateUserAction({
              user_id: +slug,
              name: values?.name,
              email: values?.email,
              password: values?.password,
            })
          ).unwrap()
        : await dispatch(
            addUserAction({
              email: values?.email,
              name: values?.name,
              password: values?.password,
            })
          ).unwrap();
      if (slug) {
        await dispatch(getUserDetailAction({ user_id: slug })).unwrap();
      } else {
        await dispatch(getUserListAction({}));
      }
      toast.show(response?.message, {
        type: "customToast",
        data: {
          type: ToastTypeProps.Success,
        },
      });
      router.navigate("/users");
    } catch (error: any) {
      console.log(error, "error");
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
      <PaddingSpace>
        <Spacer size={16} />
        <FormTemplate
          Component={UserInformationForm}
          loading={loading}
          onSubmit={onUserInformationSubmitPress}
          isSave
        />
        <Spacer size={32} />
      </PaddingSpace>
    </ScreenTemplate>
  );
};

export default addUser;
