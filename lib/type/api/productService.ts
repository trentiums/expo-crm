import { DocumentTye } from './lead';

export interface ProductServiceListParams {
  page?: number;
}
export interface ProductService {
  id: number;
  name: string;
  description: string;
  documents: DocumentTye[];
}
export interface ProductServiceResponse {
  status: boolean;
  message: string;
  data: ProductService[];
}
export interface SaveProductServiceParams {
  name: string;
  description?: string;
  documents: [];
}
export interface EditProductServiceParams {
  product_service_id: number;
  name: string;
  description?: string;
  documents: [];
}
export interface DeleteProductServicesParams {
  product_service_id: number | string;
}

export interface ProductServiceDetailsParams {
  product_service_id: number;
}
export interface ProductServiceDetailsResponse {
  status: boolean;
  message: string;
  data: ProductService;
}
