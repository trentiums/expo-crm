import React, { useEffect, useState } from 'react';
import { Field, useFormState } from 'react-final-form';
import {
  AddIconButton,
  ButtonSubmit,
  CloseButton,
  CountryCodeInput,
  CrossIconContainer,
  DocumentView,
  FlatListCon,
  FormButtonText,
  HeaderText,
  ImagePreviewShow,
  KeyboardAwareScrollViewContainer,
  Label,
  ModalView,
  NumberInput,
  PhoneNumberFieldView,
  PickerContainer,
  PressAbleContainer,
  StyledModal,
  SvgShowContainer,
  UploadText,
} from './BasicInformationForm.styles';
import { useTranslation } from 'react-i18next';
import FieldTextInput from '@molecules/FieldTextInput/FieldTextInput';
import {
  composeValidators,
  emailOrPhoneValidator,
  emailValidator,
  maxLengthValidator,
  numberValidator,
  requiredValidator,
} from '@utils/formValidators';
import { BasicInfoFormProps } from './BasicInformationForm.props';
import { Spacer } from '@atoms/common/common.styles';
import AddIcon from '@atoms/Illustrations/AddIcon';
import TrashIcon from '@atoms/Illustrations/Trash';
import { useAppTheme } from '@constants/theme';
import ActionModal from '@molecules/ActionModal/ActionModal';
import { Actions } from '@molecules/ActionModal/ActionModal.props';
import DocumentIcon from '@atoms/Illustrations/Document';
import CrossIcon from '@atoms/Illustrations/Cross';
import { FormsView } from '@organisms/LeadDetailsForm/LeadDetailsForm.styles';
import { RootState, useAppDispatch, useSelector } from '@redux/store';
import { LeadListState } from '@type/api/lead';
import {
  deleteLeadDocumentsAction,
  getLeadDetailsAction,
} from '@redux/actions/lead';
import { useToast } from 'react-native-toast-notifications';
import { ToastType, ToastTypeProps } from '@molecules/Toast/Toast.props';
import { MAX_FILE_SIZE } from '@utils/constant';
import { addLeadInformation } from '@redux/slices/leads';
import { useLocalSearchParams } from 'expo-router';
import * as MediaLibrary from 'expo-media-library';
import DropDown from '@molecules/DropDown/DropDown';
import * as Print from 'expo-print';
import { Linking } from 'react-native';
import DocumentPick from '@molecules/DocumentPicker/DocumentPicker';
import FieldDropDown from '@organisms/FieldDropDown/FieldDropdown';

const BasicInformationForm: React.FC<BasicInfoFormProps> = ({
  loading,
  form,
  isSave,
  documentArray,
  setDocumentArray,
}) => {
  const params = useLocalSearchParams();
  const { colors } = useAppTheme();
  const { t } = useTranslation('BasicInformation');
  const { t: tb } = useTranslation('formButtonName');
  const { t: tm } = useTranslation('modalText');
  const addLeadFormData = useSelector(
    (state: RootState) => state.leads.addLead,
  );
  const [pdfUri, setPdfUri] = useState(null);
  const [id] = useState<number | string | string[]>(params?.slug);
  const dispatch = useAppDispatch();
  const toast = useToast();
  const [selectedData, setSelectedData] = useState<LeadListState | undefined>();
  const [showModal, setShowModal] = useState<Boolean>(false);
  const [countryCodeError, setCountryCodeError] = useState('');
  const [ImageURI, setImageURI] = useState<{
    name?: string;
    uri?: string;
  }>({});
  const [deleteShowModal, setDeleteShowModal] = useState<Boolean>(false);
  const addLeadData = useSelector((state: RootState) => state.leads.addLead);

  const { values, valid } = useFormState();
  const countryListData = useSelector(
    (state: RootState) => state.general.countryList,
  );
  const leadsDetail = useSelector(
    (state: RootState) => state.leads.leadsDetail,
  );
  const leadsData = useSelector(
    (state: RootState) => state.leads.leadList?.leads,
  );
  const [deleteLoading, setDeleteLoading] = useState(false);
  useEffect(() => {
    const data = leadsData?.filter((item) => item.id === id);
    setSelectedData(data?.[0]);
  }, [id]);
  const [deleteDocumentUrl, setDeleteDocumentUrl] = useState(null);
  useEffect(() => {
    if (values.phoneNumber && !values?.countryCode) {
      setCountryCodeError(t('countryCodeError'));
    } else if (!values.phoneNumber && values?.countryCode) {
      setCountryCodeError(t('phoneNumberError'));
    } else if (
      (values.phoneNumber && values?.countryCode) ||
      (!values.phoneNumber && !values?.countryCode)
    ) {
      setCountryCodeError('');
    }
  }, [values]);

  useEffect(() => {
    const initializePermissionsAndForm = async () => {
      const data = leadsData.filter((item) => item?.id === id)?.[0];
      form.change('countryCode', +addLeadFormData?.countryCode);
      if (id) {
        setDocumentArray(leadsDetail?.documents);
      }
      form.change(
        'firstName',
        id ? data?.name || leadsDetail?.name : addLeadFormData?.fullName,
      );
      form.change(
        'email',
        id ? data?.email || leadsDetail?.email : addLeadFormData?.email,
      );
      form.change(
        'phoneNumber',
        id
          ? leadsData?.filter((item) => item?.id === id)?.[0]?.phone ||
              leadsDetail?.phone
          : addLeadFormData.phoneNumber,
      );
    };

    initializePermissionsAndForm();
  }, [id, selectedData]);

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
    await dispatch(getLeadDetailsAction({ lead_id: +id }));
    setDeleteShowModal(false);
    setDocumentArray(updatedDocuments);
  };

  useEffect(() => {
    dispatch(
      addLeadInformation({
        ...addLeadData,
        fullName: values.firstName,
        email: values.email,
        phoneNumber: values.phoneNumber,
        countryCode: values?.countryCode,
      }),
    );
  }, [values]);
  const generatePdf = async () => {
    try {
      const { uri } = await Print.printToFileAsync({
        html: `<h1>${t('pdfContent')}</h1><p>${t('samplePdf')}</p>`,
      });
      setPdfUri(uri);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  useEffect(() => {
    if (ImageURI?.uri?.endsWith('pdf')) {
      generatePdf();
    }
  }, [showModal]);
  return (
    <FormsView>
      <KeyboardAwareScrollViewContainer
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always">
        <Label>{`${t('firstNameLabel')} *`}</Label>
        <Field
          name="firstName"
          placeholder={t('firstNameLabel')}
          component={FieldTextInput}
          validate={requiredValidator}
        />
        <Spacer size={16} />
        <Label>{t('emailLabel')}</Label>
        <Field
          name="email"
          placeholder={t('emailLabel')}
          component={FieldTextInput}
          keyboardType="email-address"
          validate={composeValidators(
            (value) => emailOrPhoneValidator(value, form.getState().values),
            emailValidator,
          )}
        />
        <Spacer size={16} />
        <Label>{t('phoneNumberLabel')}</Label>
        <PhoneNumberFieldView>
          <CountryCodeInput>
            <Field
              name={'countryCode'}
              component={FieldDropDown}
              listData={countryListData?.map((item) => ({
                title: `+${item?.dialCode} ${item.name}`,
                id: item?.id,
                image: item?.flag,
              }))}
              isShowSelected
              placeholder={t('selectCountry')}
            />
          </CountryCodeInput>
          <NumberInput>
            <Field
              name="phoneNumber"
              placeholder={t('phoneNumberLabel')}
              component={FieldTextInput}
              keyboardType="phone-pad"
              validate={composeValidators(
                numberValidator,
                maxLengthValidator(15),
              )}
            />
          </NumberInput>
        </PhoneNumberFieldView>
        <Spacer size={24} />
        {documentArray?.length === 0 && <Label>{t('documents')}</Label>}
        <DocumentPick
          setDocumentArray={setDocumentArray}
          documentArray={documentArray}
        />
        <Spacer size={16} />

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
            icon={<TrashIcon color={colors?.deleteColor} />}
            loading={deleteLoading}
          />
        )}
      </KeyboardAwareScrollViewContainer>
      <ButtonSubmit
        onPress={!loading && !countryCodeError && form.submit}
        loading={loading}
        valid={valid && !countryCodeError}>
        <FormButtonText valid={valid && !countryCodeError}>
          {id ? tb('save') : tb('next')}
        </FormButtonText>
      </ButtonSubmit>
    </FormsView>
  );
};

export default BasicInformationForm;
