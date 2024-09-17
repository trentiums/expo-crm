import {
  DeleteLeadDocumentParams,
  DeleteLeadParams,
  LeadDetailsParams,
  LeadDetailsResponse,
  LeadListParams,
  LeadListResponse,
  SaveLeadParams,
  UpdateLeadParams,
  UpdateLeadStatusParams,
} from '@type/api/lead';
import { api } from './api';
import { AxiosPromise } from 'axios';
import { ApiResponse } from '@type/api/api';

export const saveLead = (body: SaveLeadParams): AxiosPromise<ApiResponse> =>
  api.post(`/save-lead`, body, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
export const leadList = (
  body: LeadListParams,
): AxiosPromise<LeadListResponse> => {
  return api.get('/lead-list', { params: body });
};

export const deleteLead = (body: DeleteLeadParams): AxiosPromise<ApiResponse> =>
  api.post(`/delete-lead`, body);

export const updateLead = (body: UpdateLeadParams): AxiosPromise<ApiResponse> =>
  api.post(`/update-lead`, body, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

export const updateLeadStatus = (
  body: UpdateLeadStatusParams,
): AxiosPromise<ApiResponse> => api.post(`/update-lead-status`, body);

export const deleteLeadDocuments = (
  body: DeleteLeadDocumentParams,
): AxiosPromise<ApiResponse> => api.post(`/delete-lead-document`, body);

export const getLeadDetails = (
  body: LeadDetailsParams,
): AxiosPromise<LeadDetailsResponse> =>
  api.get(`/lead-details`, { params: body });
