import { LanguageEnum } from '@redux/slices/auth';
import { AddLeadTabBar } from '@type/api/api';

export const dashboardLeads = [
  {
    title: 'lead completed',
    leads: 12,
  },
  {
    title: 'lead in progress',
    leads: 56,
  },
  {
    title: 'lead in pending',
    leads: 56,
  },
  {
    title: 'leads rejected',
    leads: 60,
  },
  {
    title: 'leads accepted',
    leads: 45,
  },
];

export const initialModalType = {
  leadChange: false,
  closeWinLost: false,
  negotiation: false,
};
export const MAX_FILE_SIZE = 5 * 1024 * 1024;
export const debounceTime = 300;
export const leadsQuickFilters = [
  {
    id: 1,
    title: 'Latest date',
    filters: {
      sort_order: 2,
      order_by: 1,
    },
  },
  {
    id: 2,
    title: 'Oldest date',
    filters: {
      sort_order: 1,
      order_by: 1,
    },
  },
  {
    id: 3,
    title: 'Name: A-Z',
    filters: {
      sort_order: 1,
      order_by: 2,
    },
  },

  {
    id: 4,
    title: 'Name: Z-A',
    filters: {
      sort_order: 2,
      order_by: 2,
    },
  },

  {
    id: 5,
    title: 'Email: A-Z',
    filters: {
      sort_order: 1,
      order_by: 3,
    },
  },

  {
    id: 6,
    title: 'Email: Z-A',
    filters: {
      sort_order: 2,
      order_by: 3,
    },
  },
];
export const stepData = [
  { id: 1, title: 'Basic', name: AddLeadTabBar.BASICINFO },
  { id: 2, title: 'Company', name: AddLeadTabBar.COMPANYINFO },
  { id: 3, title: 'Lead', name: AddLeadTabBar.LEADDETAILS },
];
export const companySizes = [
  { id: 1, title: '0—5 employees' },
  { id: 2, title: '5—20 employees' },
  { id: 3, title: '20—50 employees' },
  { id: 4, title: '50—200 employees' },
  { id: 5, title: '200—1000 employees' },
  { id: 6, title: '1000+ employees' },
];
export const languageList = [
  {
    id: 1,
    name: LanguageEnum.english,
    shortForm: 'en',
  },
  {
    id: 2,
    name: LanguageEnum.gujarati,
    shortForm: 'gu',
  },
  {
    id: 3,
    name: LanguageEnum.hindi,
    shortForm: 'hi',
  },
];
export const dashboardQuickFilters = [
  {
    id: 1,
    title: 'Lead count low-high',
    filters: {
      sort_order: 1,
      order_by: 1,
    },
  },
  {
    id: 2,
    title: 'Lead count high-low',
    filters: {
      sort_order: 2,
      order_by: 1,
    },
  },
];
