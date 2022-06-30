export interface ProductsOnPage {
  offset: number;
  limit: number;
}

export interface ProductState {
  id: number;
  title: string;
  price: number;
  description: string;
  category: object;
  images: string[];
}
