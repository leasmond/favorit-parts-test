export const selectParts = (state) => state.parts;
export const selectBrands = (state) => state.parts.brands;
export const selectOffers = (state) => state.parts.offers;
export const selectSelectedBrand = (state) => state.parts.selectedBrand;
export const selectBrandsLoading = (state) => state.parts.brandsLoading;
export const selectOffersLoading = (state) => state.parts.offersLoading;
export const selectBrandsError = (state) => state.parts.brandsError;
export const selectOffersError = (state) => state.parts.offersError;
