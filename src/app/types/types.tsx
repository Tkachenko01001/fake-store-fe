export interface Product {
  id: string | number;
  title: string;
  category: string;
  price: number;
  image: string;
};

export interface CartItemProps {
  id: string;
  image: string;
  title: string;
  price: number;
  quantity: number;
  isCartPage: boolean;
}

export type CategorySingle = string;

export type CategoriesArray = CategorySingle[];

export interface ButtonCategoryProps {
  category: CategorySingle;
}

export interface ButtonAddToCartProps {
  item: Product;
}

export interface StarRatingProps {
  rating: number;
}

export interface ApiResponse<T> {
  data: T;
  operationType: string;
}

export interface FetchProductsParams {
  operationType: string;
}

export interface FetchProductsByIdParams {
  id: string | number;
  operationType: string;
}

export interface FetchProductsByCategoryParams {
  category: string;
  operationType: string;
}