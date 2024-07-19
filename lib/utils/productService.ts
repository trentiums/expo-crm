import { ProductService } from '@type/api/productService';

export const formatServiceListData = (data: ProductService[]) => {
  return data?.map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    documents: {
      id: item?.documents?.id,
      fileCopyUri: item?.documents?.original_url,
      name: item?.documents?.name,
      size: item?.documents?.size,
      uri: item?.documents?.original_url,
      type: item?.documents?.mime_type,
    },
  }));
};
export const formatProductServiceDetail = (data: ProductService) => {
  return {
    id: data?.id,
    name: data?.name,
    description: data?.description,
    documents: {
      id: data?.documents?.id,
      fileCopyUri: data?.documents?.original_url,
      name: data?.documents?.name,
      size: data?.documents?.size,
      uri: data?.documents?.original_url,
      type: data?.documents?.mime_type,
    },
  };
};
