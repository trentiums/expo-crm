import { ProductService } from '@type/api/productService';

export const formatServiceListData = (data: ProductService[]) => {
  return data?.map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description,
  }));
};
