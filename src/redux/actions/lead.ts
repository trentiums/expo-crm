import { withToastForError } from "@utils/thunk";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  DeleteLeadDocumentsParams,
  DeleteLeadParams,
  LeadDetailsParams,
  LeadDetailsResponse,
  LeadListParams,
  LeadListResponse,
  SaveLeadParams,
  UpdateLeadParams,
} from "@type/api/lead";
import { ApiResponse } from "@type/api/api";
import {
  deleteLead,
  deleteLeadDocuments,
  getLeadDetails,
  leadList,
  saveLead,
  updateLead,
} from "@api/lead";
export const saveLeadAction = createAsyncThunk(
  "lead/saveLead",
  withToastForError<SaveLeadParams, ApiResponse>(async (data) => {
    const response = await saveLead(data);
    return response.data;
  })
);

export const getLeadListAction = createAsyncThunk(
  "lead/getLeadList",
  withToastForError<LeadListParams, LeadListResponse>(async (data) => {
    const response = await leadList(data);
    return response.data;
  })
);

export const deleteLeadAction = createAsyncThunk(
  "lead/deleteLeadList",
  withToastForError<DeleteLeadParams, ApiResponse>(async (data) => {
    const response = await deleteLead(data);
    return response.data;
  })
);

export const updateLeadAction = createAsyncThunk(
  "lead/updateLead",
  withToastForError<UpdateLeadParams, ApiResponse>(async (data) => {
    const response = await updateLead(data);
    return response.data;
  })
);
export const deleteLeadDocumentsAction = createAsyncThunk(
  "lead/deleteDocument",
  withToastForError<DeleteLeadDocumentsParams, ApiResponse>(async (data) => {
    const response = await deleteLeadDocuments(data);
    return response.data;
  })
);

export const getLeadDetailsAction = createAsyncThunk(
  "lead/leadDetails",
  withToastForError<LeadDetailsParams, LeadDetailsResponse>(async (data) => {
    const response = await getLeadDetails(data);
    return response.data;
  })
);
