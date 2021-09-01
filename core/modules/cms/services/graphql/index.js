import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import * as Schema from '@core_modules/cms/services/graphql/schema';
import { getLoginInfo } from '@helper_auth';

let isLogin = 0;
if (typeof window !== 'undefined') {
    isLogin = getLoginInfo();
}

export const getCmsPage = (variables) => useQuery(Schema.getCmsPage, {
    variables,
    context: {
        request: isLogin ? 'internal' : '',
    },
    ...(isLogin && { fetchPolicy: 'network-only' }),
});
export const getInstagramToken = () => useLazyQuery(Schema.getInstagramToken);

export const getPageBuilderTemplate = (variables) => useQuery(Schema.getPageBuilderTemplate, {
    variables,
});

// mutation
export const getInstagramFeed = () => useMutation(Schema.getInstagramFeed, {
    context: {
        request: 'internal',
    },
});

export const getCmsBlocks = (variables) => useQuery(Schema.getCmsBlocks, {
    variables,
    context: {
        request: isLogin ? 'internal' : '',
    },
    fetchPolicy: isLogin ? 'network-only' : '',
});

export default { getCmsPage };
