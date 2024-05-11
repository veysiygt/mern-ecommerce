import { Product } from "@/types/product";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ProductState {
  products: Product[];
  loading: boolean;
}

const initialState: ProductState = {
  products: [],
  loading: false,
};

export const getProducts = createAsyncThunk<Product[]>(
  "products",
  async () => {
    const response = await fetch("http://localhost:4000/products");
    const data = await response.json() as Product[];
    return data;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    resetProducts(state) {
      state.products = [];
      state.loading = false;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
      state.loading = false;
      state.products = action.payload;
    });
    builder.addCase(getProducts.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { resetProducts } = productSlice.actions;

export default productSlice.reducer;
