/* File penyimpan data state dari redux */

/* Import Module */
import { configureStore } from '@reduxjs/toolkit'; // impoort coinfigurasi
import authReducer from '../features/authSlice';  // import redux

/* Export (auth) */
export const store = configureStore({
  /*  reducer adalah sebuah fungsi yang akan memproses action dan merubah state pada stor */
  reducer: {
    auth: authReducer //  mmenangkap auth
  },
});