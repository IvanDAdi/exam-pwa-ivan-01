import Layout from '@layout';
import { debuging } from '@config';
import PropTypes from 'prop-types';
import CustomerLayout from '@layout_customer';
import { getOrderDownloadable } from '@core_modules/order/services/graphql';

const HistoryDownload = (props) => {
    const {
        t, Content, Skeleton, ErrorView,
    } = props;
    const pageConfig = {
        title: t('customer:menu:myDownload'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('customer:menu:myDownload'),
        bottomNav: false,
    };

    const {
        loading, data, error,
    } = getOrderDownloadable();

    if (loading || (!data)) {
        return (
            <Layout pageConfig={pageConfig} {...props}>
                <CustomerLayout {...props}>
                    <Skeleton />
                </CustomerLayout>
            </Layout>
        );
    }

    if (error) {
        return (
            <Layout pageConfig={pageConfig} {...props}>
                <ErrorView
                    type="error"
                    message={debuging.originalError ? error.message.split(':')[1] : t('common:error:fetchError')}
                />
            </Layout>
        );
    }

    return (
        <Layout pageConfig={pageConfig} {...props}>
            <Content
                {...props}
                data={data?.customerDownloadableProducts?.items || []}
            />
        </Layout>
    );
};

HistoryDownload.propTypes = {
    ErrorView: PropTypes.func,
    Content: PropTypes.func,
    Skeleton: PropTypes.func,
};

HistoryDownload.defaultProps = {
    ErrorView: () => null,
    Content: () => null,
    Skeleton: () => null,
};

export default HistoryDownload;
