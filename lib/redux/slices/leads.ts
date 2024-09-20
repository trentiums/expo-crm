import { logoutUserAction } from '@redux/actions/auth';
import {
  deleteLeadAction,
  getLeadDetailsAction,
  getLeadListAction,
} from '@redux/actions/lead';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  LeadDetailsResponse,
  LeadListResponse,
  LeadListState,
  LeadsFilterType,
} from '@type/api/lead';
import { AddLeadState } from '@type/redux/slices/leads';
import { formatLeadDetails, formatLeadList } from '@utils/lead';
export interface LeadsState {
  addLead: AddLeadState;
  leadList: {
    currentPage: number;
    lastPage: number;
    perPage: number;
    total: number;
    leads: LeadListState[];
  };
  leadsDetail: LeadListState;
  leadsFilter: LeadsFilterType;
  leadsSort?: number;
}
const initialState: LeadsState = {
  addLead: {
    fullName: '',
    phoneNumber: undefined,
    countryCode: undefined,
    email: '',
    companyName: '',
    companySize: undefined,
    webSite: '',
    source: undefined,
    budget: undefined,
    timeFrame: undefined,
    comments: '',
    selectedLead: 0,
    selectedChannel: 0,
    selectedStage: 0,
    selectedServices: [],
    dealAmount: 0,
    winCloseReason: '',
    dealCloseDate: '',
    documents: [],
    assignTo: undefined,
    dealAmountCurrencyCode: undefined,
    budgetCurrencyCode: undefined,
    timeFrameType: undefined,
  },
  leadList: {
    currentPage: 0,
    lastPage: 0,
    perPage: 0,
    total: 0,
    leads: [],
  },
  leadsDetail: {
    id: 0,
    companyUserId: 0,
    name: '',
    email: '',
    phone: 0,
    companyName: '',
    companySize: '',
    companyWebsite: '',
    budget: '',
    timeLine: '',
    description: '',
    dealAmount: '',
    winCloseReason: '',
    dealCloseDate: '',
    leadStatusId: 0,
    leadChannelId: 0,
    leadConversionId: 0,
    countryId: 0,
    productService: [],
    createdAt: '',
    updatedAt: '',
    webSite: '',
    documents: [],
    assignTo: 0,
    budgetCurrencyCode: undefined,
    dealAmountCurrencyCode: undefined,
    timeFrameType: undefined,
  },
  leadsFilter: {},
  leadsSort: undefined,
};

const leadSlice = createSlice({
  name: 'leads',
  initialState,
  reducers: {
    addLeadInformation: (state, action: PayloadAction<AddLeadState>) => {
      state.addLead = action.payload;
    },
    setLeadsInformation: (state) => {
      state.addLead = initialState.addLead;
    },
    setLeadsFilters: (state, action) => {
      state.leadsFilter = action.payload;
    },
    resetLeadsFilters: (state, action) => {
      state.leadsDetail = initialState.leadsDetail;
    },
    setLeadsSort: (state, action) => {
      state.leadsSort = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getLeadListAction.fulfilled,
      (state, action: PayloadAction<LeadListResponse>) => {
        const data = formatLeadList(action.payload.data.data);
        if (
          action.payload.data.current_page !== 1 &&
          state.leadList.currentPage !== action.payload.data.current_page
        ) {
          let mergedArray = state.leadList.leads.concat(data);
          state.leadList.leads = mergedArray;
        } else {
          state.leadList.leads = data;
        }
        state.leadList.currentPage = action.payload.data.current_page;
        state.leadList.lastPage = action.payload.data.last_page;
        state.leadList.perPage = action.payload.data.per_page;
        state.leadList.total = action.payload.data.total;
      },
    );
    builder.addCase(
      getLeadDetailsAction.fulfilled,
      (state, action: PayloadAction<LeadDetailsResponse>) => {
        const data = formatLeadDetails(action.payload.data);
        state.leadList.leads = state.leadList.leads.map((item) =>
          item.id === data.id ? data : item,
        );
        state.leadsDetail = data;
      },
    );
    builder.addCase(deleteLeadAction.fulfilled, (state, action) => {
      state.leadList.leads = state.leadList.leads.filter(
        (item) => item.id !== action.payload.data.lead_id,
      );
      state.leadList.total = state.leadList.total - 1;
    });
    builder.addCase(logoutUserAction.fulfilled, () => {
      return initialState;
    });
  },
});
export const {
  addLeadInformation,
  setLeadsInformation,
  setLeadsFilters,
  setLeadsSort,
} = leadSlice.actions;
export default leadSlice.reducer;
