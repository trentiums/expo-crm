export interface ProductServiceListParams {
  page?: number;
}
export interface ProductService {
  id: number;
  name: string;
  description: string;
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
