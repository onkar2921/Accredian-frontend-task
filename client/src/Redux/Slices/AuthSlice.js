import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

import CryptoJS from "crypto-js";

const uri = import.meta.env.VITE_SERVER_URI;
const secreate = import.meta.env.VITE_SECREATEKEY;


// signup
export const SignUpApi = createAsyncThunk("SignUpApi", async (dataToEncrypt) => {
  try {
    const encryptedData = CryptoJS.AES.encrypt(
      JSON.stringify(dataToEncrypt),
      secreate).toString();

    const result = await fetch(`${uri}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify({ encryptedData }),
    });

    if (result) {
      return await result.json();
    }
  } catch (error) {
    console.log("error", error);
  }
});

// login
export const LoginApi = createAsyncThunk("LoginApi", async (dataToEncrypt) => {
  try {
    console.log("password",dataToEncrypt.password)
    const encryptedData = CryptoJS.AES.encrypt(
        JSON.stringify(dataToEncrypt),
        secreate).toString();
  
      const result = await fetch(`${uri}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify({ encryptedData }),
      });
  
      if (result) {
        return await result.json();
      }
  } catch (error) {
    console.log("error", error);
  }
});

//get user data
export const GetUserDataApi = createAsyncThunk("GetUserDataApi", async () => {
  try {
    
        // const userId=localStorage.getItem("userId")
        const token=localStorage.getItem("token");
      const result = await fetch(`${uri}/getuser`, {
        method: "get",
        headers: {
          "Content-Type": "application/json", 
          'Authorization': `Bearer ${token}`,
        },
        
      });
  
      if (result) {
        return await result.json();
      }
  } catch (error) {
    console.log("error", error);
  }
});

export const AuthSlice = createSlice({
  name: "Auth",
  initialState: {
    userName: "",
    email: "",
    password: "",
    contact: "",
    address: "",
    avatar: "",
    loading: false,
  error: null,
  },

  reducers: {},

  extraReducers:(builder)=>{

    builder
    .addCase(SignUpApi.fulfilled, (state) => {
      state.error = null;
    })
    .addCase(SignUpApi.pending, (state) => {
      state.loading = true;
    })
    .addCase(SignUpApi.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })
    .addCase(LoginApi.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      localStorage.setItem('userId', action.payload.exist[0][0].id);
      localStorage.setItem('token', action.payload.token);
    })
    .addCase(LoginApi.pending, (state) => {
      state.loading = true;
    })
    .addCase(LoginApi.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })
    .addCase(GetUserDataApi.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      const userData = action.payload?.userData[0][0];
      if (userData) {
        state.userName = userData.username;
        state.id = userData.id;
        state.email = userData.email;
        state.address = userData.address;
        state.contact = userData.contact;
      }
    })
    .addCase(GetUserDataApi.pending, (state) => {
      state.loading = true;
    })
    .addCase(GetUserDataApi.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });


  }
});

export default AuthSlice.reducer;
