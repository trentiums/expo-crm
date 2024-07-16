import { User } from '@type/api/user';

export const formateUser = (data: User[]) => {
  return data?.map((item) => ({
    id: item?.id,
    name: item?.name,
    email: item?.email,
    userRole: item?.user_role,
    createdAt: item?.created_at,
  }));
};
export const formatUserDetail = (data: User) => {
  return {
    id: data?.id,
    name: data?.name,
    email: data?.email,
    userRole: data?.user_role,
    createdAt: data?.created_at,
  };
};
