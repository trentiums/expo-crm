import { PaddingSpace, Spacer } from "@atoms/common/common.styles";
import { useAppTheme } from "@constants/theme";
import { ToastTypeProps } from "@molecules/Toast/Toast.props";
import UserInformationForm from "@organisms/UserInformationForm/UserInformationForm";
import { UserInformationFormValues } from "@organisms/UserInformationForm/UserInformationForm.props";
import {
  addUserAction,
  getAssignUserListAction,
  getUserDetailAction,
  getUserListAction,
  updateUserAction,
} from "@redux/actions/user";
import { useAppDispatch } from "@redux/store";
import FormTemplate from "@templates/FormTemplate/FormTemplate";
import ScreenTemplate from "@templates/ScreenTemplate/ScreenTemplate";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useToast } from "react-native-toast-notifications";

const addUser = () => {
  const toast = useToast();
  const { colors } = useAppTheme();
  const dispatch = useAppDispatch();
  const params = useLocalSearchParams();
  const navigation = useNavigation();
  const { t } = useTranslation("screenTitle");
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
      await dispatch(getAssignUserListAction());
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
  useEffect(() => {
    navigation.setOptions({
      title: t("editUser"),
      headerStyle: {
        backgroundColor: colors.tabBar,
      },
      headerTintColor: colors.white,
    });
  }, [navigation]);
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
