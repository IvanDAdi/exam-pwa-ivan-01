/* eslint-disable no-unused-vars */
/* eslint-disable semi-style */
import Typography from '@common_typography';
import { formatPrice } from '@helper_currency';

const TableListProduct = ({
    data, t, currency, currencyCache,
}) =>
    null
    // return (
    //     <TableContainer component={Paper} className={styles.tableContainer}>
    //         <Table className={styles.table} size="small" aria-label="a dense table">
    //             <TableHead>
    //                 <TableRow className={styles.tableRowHead}>
    //                     {/* <TableCell width="10%" align="left">
    //                         <Typography variant="span" type="bold">
    //                             #
    //                         </Typography>
    //                     </TableCell> */}
    //                     <TableCell width="25%" align="left">
    //                         <Typography variant="span" type="bold">
    //                             {t('common:product:titleProduct')}
    //                         </Typography>
    //                     </TableCell>
    //                     <TableCell width="15%" align="left">
    //                         <Typography variant="span" type="bold">
    //                             SKU
    //                         </Typography>
    //                     </TableCell>
    //                     <TableCell width="10%" align="right">
    //                         <Typography variant="span" type="bold">
    //                             {t('common:title:price')}
    //                         </Typography>
    //                     </TableCell>
    //                     <TableCell width="10%" align="right">
    //                         <Typography variant="span" type="bold">
    //                             {t('common:title:shortQty')}
    //                         </Typography>
    //                     </TableCell>
    //                     <TableCell width="10%" align="right">
    //                         <Typography variant="span" type="bold">
    //                             {t('common:subtotal')}
    //                         </Typography>
    //                     </TableCell>
    //                 </TableRow>
    //             </TableHead>
    //             <TableBody>
    //                 {data && data.length > 0 ? (
    //                     <>
    //                         {
    //                             data.map((val, index) => (
    //                                 <TableRow className={styles.tableRowResponsive} key={index}>
    //                                     {/* <TableCell
    //                                         align="center"
    //                                     >
    //                                         <div className={styles.productImgContainer}>
    //                                             <img
    //                                                 src={val.image_url || `${basePath}/assets/img/placeholder.png`}
    //                                                 className={styles.productImg}
    //                                                 alt={val.name}
    //                                                 onError={(e) => {
    //                                                     e.target.onerror = null; e.target.src = `${basePath}/assets/img/placeholder.png`;
    //                                                 }}
    //                                             />
    //                                         </div>
    //                                     </TableCell> */}
    //                                     <TableCell
    //                                         align="left"
    //                                     >
    //                                         <Typography variant="span" letter="capitalize">
    //                                             {val.name}
    //                                         </Typography>
    //                                     </TableCell>
    //                                     <TableCell
    //                                         align="left"
    //                                     >
    //                                         <Typography variant="span" letter="capitalize">
    //                                             {val.sku}
    //                                         </Typography>
    //                                     </TableCell>
    //                                     <TableCell
    //                                         align="right"
    //                                     >
    //                                         <Typography variant="span" align="right" letter="capitalize">
    //                                             {formatPrice(val.price_incl_tax, currency, currencyCache)}
    //                                         </Typography>
    //                                     </TableCell>
    //                                     <TableCell
    //                                         align="right"
    //                                     >
    //                                         <Typography variant="span" align="right" letter="capitalize">
    //                                             {val.qty_ordered}
    //                                         </Typography>
    //                                     </TableCell>
    //                                     <TableCell
    //                                         align="right"
    //                                     >
    //                                         <Typography variant="span" align="right" letter="capitalize">
    //                                             {formatPrice(val.row_total_incl_tax, currency, currencyCache)}
    //                                         </Typography>
    //                                     </TableCell>
    //                                 </TableRow>
    //                             ))
    //                         }
    //                     </>
    //                 ) : (
    //                     <TableRow>
    //                         <TableCell colSpan={6}>
    //                             <Alert severity="warning">{t('order:notFound')}</Alert>
    //                         </TableCell>
    //                     </TableRow>
    //                 )}
    //             </TableBody>
    //         </Table>
    //     </TableContainer>
    // );
;

export default TableListProduct;
