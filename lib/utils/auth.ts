import {LoginDataResponse} from "@type/api/auth";
import {User} from "@type/redux/slices/auth";


export const formatAuthUser = (data: LoginDataResponse): User => {
  return {
    name: data?.name,
    email: data?.email,
    userRole: data?.user_role,
    userId: data?.id,
    token: data?.token,
  };
};
