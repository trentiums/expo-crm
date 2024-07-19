import images from "@assets/images";
import { AddLeadTabBar } from "@type/api/api";
import moment from "moment";

export const DummyDataSelectMenu = [
  { label: "1", value: "Mobiles" },
  { label: "2", value: "Appliances" },
  { label: "3", value: "Cameras" },
  { label: "4", value: "Computers" },
  { label: "5", value: "Vegetables" },
  { label: "6", value: "Diary Products" },
  { label: "7", value: "Drinks" },
];

export const jobWorkListDummyData = [
  "Review project proposal",
  "Complete market research",
  "Update website content",
  "Attend team meeting",
  "Develop marketing strategy",
];

export const dummyLeadDetailCard = [
  {
    id: 1,
    slug: "slugcard1",
    cardImage: images?.appIconImage,
    title: "User Name only",
    whatsAppNumber: "917800176120",
    phoneNumber: "+91 7800176120",
    channelList: DummyDataSelectMenu,
    leadList: DummyDataSelectMenu,
    StageList: DummyDataSelectMenu,
    LeadDetails: jobWorkListDummyData,
    mailID: "testdata@mailsac.com",
    dateTime: moment().format("DD MMM YYYY, hh:mm A"),
  },
  {
    id: 2,
    slug: "slugcard2",
    cardImage: images?.appIconImage,
    title: "User Name Trentium",
    whatsAppNumber: "917876747271",
    phoneNumber: "+91 7876747271",
    channelList: DummyDataSelectMenu,
    leadList: DummyDataSelectMenu,
    StageList: DummyDataSelectMenu,
    LeadDetails: jobWorkListDummyData,
    mailID: "testmaalltheilalldata@gmail.com",
    dateTime: moment().format("DD MMM YYYY, hh:mm A"),
  },
  {
    id: 3,
    slug: "slugcard3",
    cardImage: images?.appIconImage,
    title: "User Name Trentium update that things about all",
    whatsAppNumber: "919897949596",
    phoneNumber: "+91 9897949596",
    channelList: DummyDataSelectMenu,
    leadList: DummyDataSelectMenu,
    StageList: DummyDataSelectMenu,
    LeadDetails: jobWorkListDummyData,
    mailID: "testmaalltheilatestdatalldata@gmail.com",
    dateTime: moment().format("DD MMM YYYY, hh:mm A"),
  },
  {
    id: 4,
    slug: "slugcard4",
    cardImage: images?.appIconImage,
    title: "User Name Trentium",
    whatsAppNumber: "919596929391",
    phoneNumber: "+91 9596929391",
    channelList: DummyDataSelectMenu,
    leadList: DummyDataSelectMenu,
    StageList: DummyDataSelectMenu,
    LeadDetails: jobWorkListDummyData,
    mailID: "testmail@yopmail.com",
    dateTime: moment().format("DD MMM YYYY, hh:mm A"),
  },
  {
    id: 5,
    slug: "slugcard5",
    cardImage: images?.appIconImage,
    title: "User Name Trentium",
    whatsAppNumber: "919795969291",
    phoneNumber: "+91 9795969291",
    channelList: DummyDataSelectMenu,
    leadList: DummyDataSelectMenu,
    StageList: DummyDataSelectMenu,
    LeadDetails: jobWorkListDummyData,
    mailID: "testmail@yopmail.com",
    dateTime: moment().format("DD MMM YYYY, hh:mm A"),
  },
  {
    id: 6,
    slug: "slugcard6",
    cardImage: images?.appIconImage,
    title: "User Name Trentium",
    whatsAppNumber: "917875727371",
    phoneNumber: "+91 7875727371",
    channelList: DummyDataSelectMenu,
    leadList: DummyDataSelectMenu,
    StageList: DummyDataSelectMenu,
    LeadDetails: jobWorkListDummyData,
    mailID: "testmail@yopmail.com",
    dateTime: moment().format("DD MMM YYYY, hh:mm A"),
  },
];

export const dummyUserFormData = {
  name: "test data",
  email: "test@mailsac.com",
  phone: 9853456287,
  imageLink:
    "https://fbf-bucket.s3.eu-west-2.amazonaws.com/6280/6662e842a2405_15513.png",
};

export const dropdownNumberData = [
  { id: 1, label: "+1", value: "+1" },
  { id: 2, label: "+2", value: "+2" },
  { id: 3, label: "+91", value: "+91" },
  { id: 4, label: "+9", value: "+9" },
  { id: 5, label: "+21", value: "+21" },
  { id: 6, label: "+23", value: "+23" },
];

export const dropdownData = [
  { id: 1, label: "Option 1", value: "option1" },
  { id: 2, label: "Option 2", value: "option2" },
  { id: 3, label: "Option 3", value: "option3" },
];

export const AddLeadTabBarData = [
  {
    title: AddLeadTabBar.BASICINFO,
  },
  {
    title: AddLeadTabBar.COMPANYINFO,
  },

  {
    title: AddLeadTabBar.LEADDETAILS,
  },
];
