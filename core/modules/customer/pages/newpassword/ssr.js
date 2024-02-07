import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const getSSRProps = async (ctx) => ({
    props: {
        ...(await serverSideTranslations(ctx.locale, ['common', 'validate', 'customer'])),
        withAuth: true,
        query: ctx.query,
    },
});

export default getSSRProps;