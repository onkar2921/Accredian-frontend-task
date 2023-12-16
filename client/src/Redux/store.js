import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from './Slices/AuthSlice';
export default configureStore({
  reducer: {
    Auth:AuthReducer
  },
});