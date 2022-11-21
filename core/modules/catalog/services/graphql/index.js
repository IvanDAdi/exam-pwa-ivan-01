import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import * as schemaCategory from '@core_modules/catalog/services/graphql/categorySchema';
import * as productSchema from '@core_modules/catalog/services/graphql/productSchema';

/**
 * Function Get Product Schema
 * @param config Object Config like variables
 * @param otherConfig Object config useQuery like context
 * @param router router Object from nextjs (useRouter hook)
 * @returns Schema get product
 */
export const getProduct = (config, otherConfig = {}, router) => useQuery(productSchema.getProduct(config, router), {
    ...otherConfig,
});
export const getProductAgragations = () => useQuery(productSchema.getProductAgragations(), {});
export const getCategory = (variables) => useQuery(schemaCategory.getCategory(variables), {
});
export const getCategoryProducts = (variables) => useQuery(schemaCategory.getCategoryProducts(variables), {
    context: {
        request: 'internal',
    },
});
export const getFilter = (catId) => useQuery(schemaCategory.getFilter(catId), { ssr: true });
export const addWishlist = () => useMutation(productSchema.addWishlist, {
    context: {
        request: 'internal',
    },
});

export const getDetailProduct = (config = {}) => useLazyQuery(productSchema.getDetailProduct(config), {
    fetchPolicy: 'no-cache',
    extFetchPolicy: 'no-cache',
});

export const getSeller = (options = {}) => useLazyQuery(productSchema.getSeller, {
    ...options,
});

export const getPwaConfig = () => useQuery(schemaCategory.configpwa);

export default { getCategory, getCategoryProducts, getSeller };
