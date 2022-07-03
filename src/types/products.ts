export interface ProductsOnPage {
  offset: number;
  limit: number;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
}

export interface ProductInCart extends Product {
  quantity: number;
}

export interface Category {
  id: number;
  name: string;
  image: string;
}
