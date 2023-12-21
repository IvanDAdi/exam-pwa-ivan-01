/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable @next/next/no-img-element */
import Typography from '@common_typography';
import Radio from '@material-ui/core/Radio';
import classNames from 'classnames';
import useStyles from '@core_modules/checkout/components/radioitem/style';
import { formatPrice } from '@helpers/currency';
import { useReactiveVar } from '@apollo/client';
import { currencyVar } from '@root/core/services/graphql/cache';

const RadioDeliveryItem = (props) => {
    const styles = useStyles();
    const {
        value,
        label,
        promoLabel,
        selected,
        onChange = () => {},
        borderBottom = true,
        image = null,
        classContent = '',
        amount,
        price_incl_tax,
        storeConfig,
        disabled = false,
    } = props;
    const handleChange = () => {
        if (!disabled) {
            onChange(value);
        }
    };

    // cache currency
    const currencyCache = useReactiveVar(currencyVar);

    const labelType = selected ? 'bold' : 'regular';
    const rootStyle = borderBottom ? styles.root : styles.rootRmBorder;
    let rightSide;

    if (image) {
        rightSide = <img src={image} className={styles.imgList} alt="cimb" />;
    }
    const base_currency_code = storeConfig ? storeConfig.base_currency_code : 'RP';
    if (amount && price_incl_tax && price_incl_tax.value > amount.value) {
        rightSide = (
            <div className="flex flex-row between-xs">
                <div className="xs:basis-full sm:basis-1/2">
                    <Typography variant="p" type={labelType} className={styles.originalPrice} align="right">
                        {formatPrice(price_incl_tax.value, amount.currency, currencyCache || base_currency_code, currencyCache)}
                    </Typography>
                </div>
                <div className="xs:basis-full sm:basis-1/2">
                    <Typography variant="p" type={labelType} className={styles.promo} align="right">
                        {formatPrice(amount.value, amount.currency, currencyCache || base_currency_code, currencyCache)}
                    </Typography>
                </div>
            </div>
        );
    } else if (price_incl_tax && price_incl_tax.value) {
        rightSide = (
            <div className="flex flex-row">
                <div className="xs:basis-full sm:basis-1/2">
                    <Typography variant="p" type={labelType} className={styles.notPromo} align="right">
                        {formatPrice(price_incl_tax.value, amount.currency, currencyCache || base_currency_code, currencyCache)}
                    </Typography>
                </div>
            </div>
        );
    } else if (price_incl_tax && price_incl_tax.value === 0 && amount && amount.value === 0) {
        rightSide = (
            <div className="flex flex-row">
                <div className="xs:basis-full sm:basis-1/2">
                    <Typography variant="p" type={labelType} className={styles.freeShipping} align="right">
                        {price_incl_tax.value !== 0 ? formatPrice(price_incl_tax.value, amount.currency, currencyCache
                            || base_currency_code, currencyCache) : 'FREE'}
                    </Typography>
                </div>
            </div>
        );
    }

    const shippingLabel = (
        <div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="p" type={labelType} className={styles.originalLabel}>
                    {label}
                </Typography>
            </div>
            {promoLabel ? (
                <Typography variant="p" type={labelType}>
                    (
                    {promoLabel}
                    )
                </Typography>
            ) : null}
        </div>
    );

    if (disabled) return null;

    return (
        <div className={rootStyle} id="checkoutRadioItem">
            <Radio
                color="default"
                size="small"
                checked={selected}
                onClick={handleChange}
                inputProps={{
                    id: 'checkout-radioBtn',
                }}
            />

            <div className={classNames(styles.labelContainer, classContent)}>
                {shippingLabel}
                {rightSide}
            </div>
            <style jsx />
        </div>
    );
};

export default RadioDeliveryItem;
