import { LanguageEnum } from '@redux/slices/language';

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
