import { gql } from '@apollo/client';

export const getSeller = gql`
    query getSeller($sellerId: [Int!]) {
        getSeller(input: { seller_id: $sellerId }) {
            additional_info
            address
            city
            description
            id
            latitude
            logo
            longitude
            name
            status
        }
    }
`;

export const getBannerSeller = gql`
    query getBannerSeller($sellerId: [Int!]) {
        getSeller(input: { seller_id: $sellerId }) {
            banner_desktop
            banner_mobile
        }
    }
`;

export const getProductBySellerId = gql`
    query getProductBySellerId(
        $filter: ProductAttributeFilterInput,
        $currentPage: Int!,
        $pageSize: Int!
    ) {
        products(
            filter: $filter,
            currentPage: $currentPage,
            pageSize: $pageSize
        ) {
            aggregations {
                attribute_code
                label
                options {
                    count
                    label
                    value
                }
            }
            page_info {
                current_page
                page_size
                total_pages
            }
            total_count
            items {
                id
                sku
                name
                url_key
                stock_status
                categories {
                    name
                }
                short_description {
                    html
                }
                small_image {
                    url
                    label
                }
                image {
                    url
                    label
                }
                seller {
                    seller_id
                    seller_name
                    seller_city
                }
                price_tiers {
                    discount {
                        percent_off
                        amount_off
                    }
                    final_price {
                        currency
                        value
                    }
                    quantity
                }
                price_range {
                    maximum_price {
                        discount {
                            amount_off
                            percent_off
                        }
                        final_price {
                            currency
                            value
                        }
                        fixed_product_taxes {
                            amount {
                                currency
                                value
                            }
                            label
                        }
                        regular_price {
                            currency
                            value
                        }
                    }
                    minimum_price {
                        discount {
                            amount_off
                            percent_off
                        }
                        final_price {
                            currency
                            value
                        }
                        fixed_product_taxes {
                            amount {
                                currency
                                value
                            }
                            label
                        }
                        regular_price {
                            currency
                            value
                        }
                    }
                }
                special_from_date
                special_to_date
                new_from_date
                new_to_date
            }
        }
    }
`;

export default {
    getSeller,
    getBannerSeller,
    getProductBySellerId,
};
