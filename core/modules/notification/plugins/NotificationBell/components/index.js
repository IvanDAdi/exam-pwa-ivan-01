/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Link from 'next/link';

const Content = ({ withLink, totalUnread }) => (
    <Link
        href={withLink && '/inboxnotification/notification'}
    >
        <a style={{ margin: 20, cursor: 'pointer' }} href={withLink && '/inboxnotification/notification'}>
            <Badge color="secondary" badgeContent={totalUnread || 0}>
                <NotificationsIcon color="secondary" />
            </Badge>
        </a>
    </Link>
);

export default Content;
