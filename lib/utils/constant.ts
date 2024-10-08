import { LanguageEnum } from '@redux/slices/auth';

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
      sort_order: 1,
      order_by: 1,
    },
  },
  {
    id: 2,
    title: 'Oldest date',
    filters: {
      sort_order: 2,
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
  { id: 1, title: 'Basic' },
  { id: 2, title: 'Company' },
  { id: 3, title: 'Lead' },
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
