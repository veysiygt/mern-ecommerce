// Redux slice
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/types/product";

export interface ProductState {
  products: {
    products: Product[];
  };
  loading: boolean;
}

const initialState: ProductState = {
  products: {
    products: [],
  },
  loading: false,
};
export const getProducts = createAsyncThunk<{ products: Product[] }>(
  "products", 
  async () => {
    const response = await fetch("http://localhost:4000/products");
    if (!response.ok) {
      throw new Error("Products could not be fetched.");
    }
    const data = await response.json();
    return data;
  }
);


export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, action: PayloadAction<{ products: Product[] }>) => {
      state.loading = false;
      state.products = action.payload; // Burada, `{ products: Product[] }` nesnesini kaydediyoruz.
    });
    builder.addCase(getProducts.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default productSlice.reducer;
