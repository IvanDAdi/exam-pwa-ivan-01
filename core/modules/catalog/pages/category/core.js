/* eslint-disable prefer-destructuring */
import { useReactiveVar } from '@apollo/client';
import { storeConfigVar } from '@root/core/services/graphql/cache';
import Layout from '@layout';
import { StripHtmlTags } from '@helper_text';
import { getCategory, getPwaConfig } from '@core_modules/catalog/services/graphql';
import generateSchemaOrg from '@core_modules/catalog/helpers/schema.org';
import dynamic from 'next/dynamic';
import Content from '@core_modules/catalog/pages/category/components';

const ErrorView = dynamic(() => import('@core_modules/error/pages/default'), { ssr: false });
const SkeletonView = dynamic(() => import('@core_modules/catalog/pages/category/components/Skeleton'), { ssr: false });

const Page = (props) => {
    const {
        categoryId, storeConfig: configStore, pageConfig = {}, ...other
    } = props;
    const configCache = useReactiveVar(storeConfigVar);
    const { loading, data } = getCategory({
        productSize: configStore?.pwa?.page_size || 10,
        id: categoryId,
    });
    const { data: dataConfig } = getPwaConfig();
    const storeConfig = dataConfig?.storeConfig || {};
    let config = {
        ...pageConfig,
    };
    let schemaOrg = null;
    let ogDesc;
    let ogKeyword;
    let category = null;
    if (data && data.categoryList[0]) {
        // eslint-disable-next-line prefer-destructuring
        category = data.categoryList[0];
        schemaOrg = generateSchemaOrg(category, storeConfig);
        if (data.categoryList[0].meta_description || data.categoryList[0].description) {
            ogDesc = StripHtmlTags(data.categoryList[0].meta_description || data.categoryList[0].description) || '';
        }
        if (data.categoryList[0].meta_keywords) {
            ogKeyword = StripHtmlTags(data.categoryList[0].meta_keywords) || '';
        }
        config = {
            title: data.categoryList[0]?.meta_title || data.categoryList[0]?.name || '',
            headerTitle: data && !data.categoryList[0].image_path ? data.categoryList[0].name : '',
            header: data && data.categoryList[0].image_path ? 'absolute' : 'relative', // available values: "absolute", "relative", false (default)
            bottomNav: 'browse',
            pageType: 'category',
            ogContent: {
                keywords: ogKeyword,
                'og:description': ogDesc,
            },
            schemaOrg,
        };
    }
    if (loading && !data) {
        const pwaConfig = storeConfig?.pwa || {};
        return (
            <Layout {...props} pageConfig={config}>
                <SkeletonView {...pwaConfig} />
            </Layout>
        );
    }

    if (!loading && data && !data.categoryList[0]) {
        return <ErrorView statusCode={404} {...props} />;
    }
    return (
        <Layout {...props} pageConfig={config} data={category} isPlp>
            <Content categoryId={categoryId} data={data} {...other} storeConfig={storeConfig} configCache={configCache} />
        </Layout>
    );
};

export default Page;
