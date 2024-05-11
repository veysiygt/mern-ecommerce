export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    category: string;
    images: {
      public_id: string;
      url: string;
    };
    reviews: Review[];
  }
  
  export interface Review {
    id: string;
    productId: string;
    userId: string;
    rating: number;
    comment: string;
  }
  