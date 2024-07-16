import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer, { AuthState } from "./slices/auth";
import {
  TypedUseSelectorHook,
  useSelector as useReduxSelector,
  useDispatch,
} from "react-redux";
import { persistReducer, PersistConfig, persistStore } from "redux-persist";
import * as rp from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import themeReducer, { ThemeState } from "./slices/theme";
import generalReducer, { GeneralState } from "./slices/general";
import leadsReducer, { LeadsState } from "./slices/leads";
import productServiceReducer, {
  ProductServiceState,
} from "./slices/productservice";
import dashboardReducer, { DashboardState } from "./slices/dashboard";
import userReducer, { UserState } from "./slices/user";

export interface RootState {
  auth: AuthState;
  theme: ThemeState;
  general: GeneralState;
  leads: LeadsState;
  productService: ProductServiceState;
  dashboard: DashboardState;
  user: UserState;
}

const persistConfig = {
  key: "root",
  version: 1,
  storage: AsyncStorage,
  whitelist: [
    "auth",
    "theme",
    "general",
    "leads",
    "productService",
    "dashboard",
    "user",
  ],
} as PersistConfig<RootState>;

const rootReducer = combineReducers({
  auth: authReducer,
  theme: themeReducer,
  general: generalReducer,
  leads: leadsReducer,
  productService: productServiceReducer,
  dashboard: dashboardReducer,
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
console.log("root", authReducer, leadsReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          rp.FLUSH,
          rp.REHYDRATE,
          rp.PAUSE,
          rp.PERSIST,
          rp.PURGE,
          rp.REGISTER,
        ],
      },
    }),
});

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
export default store;
