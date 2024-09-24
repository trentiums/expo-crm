import { LeadProductService, ProductService } from '@type/api/productService';

export const formatServiceListData = (data: ProductService[]) => {
  return data?.map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    documents: item?.documents?.map((item) => ({
      id: item?.id,
      uri: item?.original_url || item?.url,
      name: item?.file_name,
      size: item?.file_size,
      type: item?.mime_type,
    })),
  }));
};
export const formatProductServiceDetail = (data: ProductService) => {
  return {
    id: data?.id,
    name: data?.name,
    description: data?.description,
    documents: data?.documents?.map((item) => ({
      id: item?.id,
      uri: item?.original_url || item?.url,
      name: item?.file_name,
      size: item?.file_size,
      type: item?.mime_type,
    })),
  };
};
export const formatLeadProductService = (data: LeadProductService[]) => {
  return data?.map((item) => ({
    id: item.id,
    name: item.name,
  }));
};
