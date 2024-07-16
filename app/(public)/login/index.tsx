import React, { useState } from "react";
import FormTemplate from "@templates/FormTemplate/FormTemplate";
import ScreenTemplate from "@templates/ScreenTemplate/ScreenTemplate";
import { Container, ImageView, IntroText } from "./LoginScreen.styles";
import { Spacer } from "@atoms/common/common.styles";
import { useTranslation } from "react-i18next";
import LoginForm from "@organisms/LoginForm/LoginForm";
// import images from "@assets/images/index";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { LoginFormData } from "./LoginScreen.props";
import { loginUserAction } from "@redux/actions/auth";
import { useAppDispatch } from "@redux/store";
import { ToastTypeProps } from "@molecules/Toast/Toast.props";
import { useToast } from "react-native-toast-notifications";
import {
  countryListAction,
  leadChannelListAction,
  leadConversionListAction,
  leadStatusListAction,
} from "@redux/actions/general";
import { getProductServiceListAction } from "@redux/actions/productService";
import { Text } from "react-native-paper";
import View from "@atoms/View/View";
import { useAppTheme } from "@constants/theme";

const LoginScreen = () => {
  const { t } = useTranslation("login");
  const [loading, setLoading] = useState(false);
  // const dispatch = useAppDispatch();
  const toast = useToast();
  const { colors } = useAppTheme();

  console.log(colors, "colors");

  // const onLoginPress = async (values: LoginFormData) => {
  //   try {
  //     setLoading(true);
  //     const loginResponse = await dispatch(
  //       loginUserAction({
  //         email: values.username.trim(),
  //         password: values.password.trim(),
  //       })
  //     ).unwrap();
  //     if (await loginResponse.status) {
  //       toast.show(t("loginSuccess"), {
  //         type: "customToast",
  //         data: {
  //           type: ToastTypeProps.Success,
  //         },
  //       });
  //       await Promise.all([
  //         dispatch(leadChannelListAction()),
  //         dispatch(leadConversionListAction()),
  //         dispatch(leadStatusListAction()),
  //         dispatch(countryListAction()),
  //         dispatch(getProductServiceListAction({})),
  //       ]);
  //     }
  //   } catch (error: any) {
  //     toast.show(error, {
  //       type: "customToast",
  //       data: {
  //         type: ToastTypeProps.Error,
  //       },
  //     });
  //   }
  //   setLoading(false);
  // };

  return (
    <KeyboardAwareScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="always">
      {/* <Container>
        <Spacer size={50} />
        <ImageView source={images.appIconImage} />
        <Spacer size={70} />
        <IntroText>{t("signIn")}</IntroText>
        <FormTemplate
          Component={LoginForm}
          onSubmit={() => console.log("hello")}
          loading={loading}
        />
      </Container> */}
      <View>
        <Text
          style={{
            fontSize: 12,
            color: "red",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}>
          Login Screen
        </Text>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default LoginScreen;
