import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  productDetail: {},
  loading: false,
};

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    const response = await fetch("http://localhost:4000/products");
    if (!response.ok) {
      throw new Error("Products could not be fetched.");
    }
    const data = await response.json();
    return data;
  }
);

export const getProductDetail = createAsyncThunk(
  "products/getProductDetail",
  async (id) => {
    const response = await fetch(`http://localhost:4000/products/${id}`);
    if (!response.ok) {
      throw new Error("Product detail could not be fetched.");
    }
    const data = await response.json();
    return data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getProductDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.productDetail = action.payload.product || {};
      })
      .addCase(getProductDetail.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default productSlice.reducer;
