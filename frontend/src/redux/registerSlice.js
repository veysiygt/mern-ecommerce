import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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

const registerSlice = createSlice({
  name: "register",
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
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage =
          action.payload || "An unexpected error occurred during registration.";
      });
  },
});

export const { reset } = registerSlice.actions;

export default registerSlice.reducer;
