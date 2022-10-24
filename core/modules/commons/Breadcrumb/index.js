/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Chip from '@material-ui/core/Chip';
import Typography from '@common_typography';
import NavigateNext from '@material-ui/icons/NavigateNext';
import { setResolver, getResolver } from '@helper_localstorage';

const useStyles = makeStyles({
    root: {
        '& a': {
            cursor: 'pointer',
        },

        '& p': {
            marginLeft: 0,
        },
        marginBottom: 20,
    },
});

const ItemBreadcrub = ({
    label, link, active, id, handleClick,
}) => {
    if (link) {
        return (
            <Link href={`${link}`} passHref>
                <a onClick={() => handleClick(link, id)}>
                    <Chip size="small" label={label} color={active ? 'secondary' : 'default'} />
                </a>
            </Link>
        );
    }

    return (
        <Chip size="small" label={label} color={active ? 'secondary' : 'default'} />
    );
};

const CustomBreadcrumb = ({ data = [], variant = 'text' }) => {
    const handleClick = async (url, id) => {
        const urlResolver = getResolver();
        urlResolver[url] = {
            type: 'CATEGORY',
            id,
        };
        await setResolver(urlResolver);
    };
    const styles = useStyles();
    return (
        <Breadcrumbs separator={<NavigateNext fontSize="small" />} className={styles.root}>
            <Link href="/" className={styles.home}>
                <a>
                    <Typography variant="p">Home</Typography>
                </a>
            </Link>
            {
                variant === 'chip' ? data.map(({
                    label, link, active, id,
                }, index) => (
                    <ItemBreadcrub
                        key={index}
                        label={label}
                        link={link}
                        active={active}
                        id={id}
                        handleClick={handleClick}
                    />
                ))
                    : data.map(({
                        label, link, active, id,
                    }, index) => {
                        if (link) {
                            return (
                                <Link
                                    href={link}
                                    onClick={index === data.length - 1 ? () => {} : () => handleClick(link, id)}
                                    key={index}
                                >
                                    <a>
                                        <Typography variant="p" type={active ? 'bold' : 'regular'}>{label}</Typography>
                                    </a>
                                </Link>
                            );
                        }
                        return (
                            <Typography variant="p" type={active ? 'bold' : 'regular'}>{label}</Typography>
                        );
                    })
            }
        </Breadcrumbs>
    );
};

const BreadcrumbsComp = (props) => (
    <CustomBreadcrumb {...props} />
);

export default BreadcrumbsComp;
