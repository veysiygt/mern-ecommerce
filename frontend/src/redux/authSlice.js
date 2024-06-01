import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMessage: "",
  userToken: null,
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (formData, thunkAPI) => {
    try {
      const response = await fetch("http://localhost:4000/register", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (!response.ok) {
        const errorMessages =
          data.message || "An error occurred during registration.";
        return thunkAPI.rejectWithValue(errorMessages);
      }
      return data.token;
    } catch (error) {
      return thunkAPI.rejectWithValue("Network error or other error.");
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, thunkAPI) => {
    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();

      if (!response.ok) {
        const errorMessages = data.message || "An error occurred during login.";
        return thunkAPI.rejectWithValue(errorMessages);
      }
      return data.token;
    } catch (error) {
      return thunkAPI.rejectWithValue("Network error or other error.");
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, thunkAPI) => {
    try {
      await AsyncStorage.removeItem("userToken");
      return null;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        "An error occurred while clearing storage."
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = "";
      state.userToken = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.errorMessage = "";
        state.userToken = action.payload;
        AsyncStorage.setItem("userToken", action.payload);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage =
          action.payload || "An unexpected error occurred during registration.";
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.errorMessage = "";
        state.userToken = action.payload;
        AsyncStorage.setItem("userToken", action.payload);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage =
          action.payload || "An unexpected error occurred during login.";
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isSuccess = false;
        state.userToken = null;
      });
  },
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;
