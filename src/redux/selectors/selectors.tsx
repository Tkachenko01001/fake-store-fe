import type { RootState } from '../../redux/store';

export const selectCategories = (state: RootState) => state.categories;
export const selectProducts = (state: RootState) => state.products;
export const selectCart = (state: RootState) => state.cart;
