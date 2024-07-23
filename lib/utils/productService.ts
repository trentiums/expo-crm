import { ProductService } from "@type/api/productService";

export const formatServiceListData = (data: ProductService[]) => {
  return data?.map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    documents: {
      id: item?.documents?.id,
      uri: item?.documents?.original_url,
      name: item?.documents?.name,
      size: item?.documents?.size,
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
      uri: data?.documents?.original_url,
      name: data?.documents?.name,
      size: data?.documents?.size,
      type: data?.documents?.mime_type,
    },
  };
};
