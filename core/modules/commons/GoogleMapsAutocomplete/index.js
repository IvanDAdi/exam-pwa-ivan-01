/* eslint-disable max-len */
/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import {
    GoogleMap,
    Autocomplete,
    Marker,
    useJsApiLoader,
} from '@react-google-maps/api';
import { useTranslation } from '@i18n';
import CustomTextField from '@common_textfield';
import { capitalizeEachWord } from '@root/core/helpers/text';

// Set map container size
const containerStyle = {
    width: '100%',
    height: '230px',
};

// Set initial refs for google maps instance
const refs = {
    marker: null,
    autoComplete: null,
    googleMap: null,
};

// Get autocomplete components instance
const autoCompleteLoad = (ref) => {
    refs.autoComplete = ref;
};

// Get marker components instance
const markerLoad = (ref) => {
    refs.marker = ref;
};

// Get google map instance
const mapLoad = (ref) => {
    refs.googleMap = ref;
};

const IcubeMapsAutocomplete = (props) => {
    const {
        gmapKey,
        formik,
        dragMarkerDone,
        defaultZoom = 17,
    } = props;
    const { t } = useTranslation(['common']);

    // set libraries to use in Google Maps API
    const [libraries] = useState(['places', 'geometry']);

    // Set initial bounds to autocomplete services
    const [stateBounds, setStateBounds] = useState({
        northeast: {},
        southwest: {},
    });

    // Initiate google maps instance with configurations
    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: gmapKey,
        libraries,
    });

    const setZeroIfEmpty = (value) => {
        const emptyValues = [undefined, null, '', 'undefined', 'null'];
        return emptyValues.includes(value) ? 0 : Number(value);
    };

    // Get initial map coordinates if user already saved an address before or fetch from browser's navigator location
    const mapPosition = {
        lat: setZeroIfEmpty(props.mapPosition && props.mapPosition.lat),
        lng: setZeroIfEmpty(props.mapPosition && props.mapPosition.lng),
    };

    // Set a new coordinates information when user drag the marker icon
    const handleDragEnd = (event) => {
        const newPosition = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
        };
        dragMarkerDone(newPosition);
    };

    // Set address detail fields value on formik when user select a location on autocomplete box
    const onPlaceChanged = () => {
        // const compareStreetName = () => {}
        if (refs.autoComplete !== null) {
            const { name, address_components, geometry } = refs.autoComplete.getPlace();
            const tempInputValue = formik.values.addressDetail;
            const street_name = address_components.filter((item) => item.types.includes('route'));

            dragMarkerDone({
                lat: geometry.location.lat(),
                lng: geometry.location.lng(),
            });

            if (tempInputValue !== name) {
                if (street_name[0] !== undefined) {
                    if (street_name[0].long_name === name) {
                        if (tempInputValue === street_name[0].long_name || tempInputValue === street_name[0].short_name) {
                            formik.setFieldValue('addressDetail', `${street_name[0].long_name}`);
                        } else if (tempInputValue.length < street_name[0].long_name.length || tempInputValue.length === street_name[0].long_name.length) {
                            formik.setFieldValue('addressDetail', `${street_name[0].long_name}`);
                        } else {
                            formik.setFieldValue('addressDetail', capitalizeEachWord(tempInputValue));
                        }
                    } else if (tempInputValue.length > name.length) {
                        if (tempInputValue.toLowerCase().includes(street_name[0].long_name.toLowerCase()) || tempInputValue.toLowerCase().includes(street_name[0].short_name.toLowerCase()) || tempInputValue.toLowerCase().includes(name.toLowerCase())) {
                            // eslint-disable-next-line max-len
                            if (tempInputValue.toLowerCase().includes(`${street_name[0].long_name.toLowerCase()} ${name.toLowerCase()}`) || tempInputValue.toLowerCase().includes(`${street_name[0].short_name.toLowerCase()} ${name.toLowerCase()}`)) {
                                formik.setFieldValue('addressDetail', capitalizeEachWord(tempInputValue));
                            } else {
                                formik.setFieldValue('addressDetail', `${street_name[0].short_name} ${name}`);
                            }
                        } else {
                            formik.setFieldValue('addressDetail', capitalizeEachWord(tempInputValue));
                        }
                    } else if (name.length > street_name[0].short_name.length && (name.toLowerCase().includes(street_name[0].short_name.toLowerCase()) || name.toLowerCase().includes(street_name[0].long_name.toLowerCase()))) {
                        formik.setFieldValue('addressDetail', name);
                    } else if (name.toLowerCase().includes('street')) {
                        formik.setFieldValue('addressDetail', `${street_name[0].short_name}`);
                    } else {
                        formik.setFieldValue('addressDetail', `${street_name[0].short_name} ${name}`);
                    }
                } else if (tempInputValue.length > name.length) {
                    formik.setFieldValue('addressDetail', capitalizeEachWord(tempInputValue));
                } else {
                    formik.setFieldValue('addressDetail', name);
                }
            } else {
                formik.setFieldValue('addressDetail', name);
            }
        }
    };

    // Get a new coordinates bounds based on current address information input (village, district, city, region)
    useEffect(() => {
        if (formik !== false) {
            if (!!formik.values.village && !!formik.values.district && !!formik.values.city && !!formik.values.region) {
                fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${formik.values.village.label}+${formik.values.district.label}+${formik.values.city.label}+${formik.values.region.name}&language=id&key=AIzaSyAsE5tvjrOes4cyL0jpUEtLKMVY65rAwgQ`)
                    .then((response) => response.json())
                    .then((responseData) => {
                        if (responseData.results.length > 0) {
                            const { bounds } = responseData.results[0].geometry;
                            setStateBounds({
                                northeast: {
                                    lat: parseFloat(bounds.northeast.lat),
                                    lng: parseFloat(bounds.northeast.lng),
                                },
                                southwest: {
                                    lat: parseFloat(bounds.southwest.lat),
                                    lng: parseFloat(bounds.southwest.lng),
                                },
                            });
                        }
                    })
                    .catch((e) => {
                        // eslint-disable-next-line no-console
                        console.log(e);
                    });
            }
        }
    }, [formik.values.village, formik.values.district, formik.values.city, formik.values.region]);

    // Function to render the maps
    // eslint-disable-next-line arrow-body-style
    const renderMap = () => {
        return (
            <>
                <Autocomplete
                    onLoad={autoCompleteLoad}
                    onPlaceChanged={onPlaceChanged}
                    options={{
                        // eslint-disable-next-line no-undef
                        bounds: new google.maps.LatLngBounds(
                            // eslint-disable-next-line no-undef
                            new google.maps.LatLng(parseFloat(stateBounds.southwest.lat !== undefined ? stateBounds.southwest.lat : mapPosition.lat),
                                parseFloat(stateBounds.southwest.lng !== undefined ? stateBounds.southwest.lng : mapPosition.lng)),
                            // eslint-disable-next-line no-undef
                            new google.maps.LatLng(parseFloat(stateBounds.northeast.lat !== undefined ? stateBounds.northeast.lat : mapPosition.lat),
                                parseFloat(stateBounds.northeast.lng !== undefined ? stateBounds.northeast.lng : mapPosition.lng)),
                        ),
                        strictBounds: true,
                    }}
                >
                    <CustomTextField
                        autoComplete="new-password"
                        label={t('common:form:addressDetail')}
                        placeholder={t('common:search:addressDetail')}
                        name="addressDetail"
                        value={formik.values.addressDetail}
                        onChange={(e) => { formik.handleChange(e); }}
                        error={!!(formik.touched.addressDetail && formik.errors.addressDetail)}
                        errorMessage={(formik.touched.addressDetail && formik.errors.addressDetail) || null}
                        onFocus={(e) => {
                            e.target.setAttribute('autocomplete', 'off');
                            e.target.setAttribute('autocorrect', 'false');
                            e.target.setAttribute('aria-autocomplete', 'both');
                            e.target.setAttribute('aria-haspopup', 'false');
                            e.target.setAttribute('spellcheck', 'off');
                            e.target.setAttribute('autocapitalize', 'off');
                            e.target.setAttribute('autofocus', '');
                            e.target.setAttribute('role', 'combobox');
                        }}
                    />
                </Autocomplete>
                <GoogleMap
                    id="google-maps-container"
                    mapContainerStyle={containerStyle}
                    center={mapPosition}
                    onLoad={mapLoad}
                    zoom={defaultZoom}
                    options={{
                        restriction: {
                            // eslint-disable-next-line no-undef
                            latLngBounds: new google.maps.LatLngBounds(
                                // eslint-disable-next-line no-undef
                                new google.maps.LatLng(parseFloat(stateBounds.southwest.lat !== undefined ? stateBounds.southwest.lat : mapPosition.lat - 0.025),
                                    parseFloat(stateBounds.southwest.lng !== undefined ? stateBounds.southwest.lng : mapPosition.lng - 0.025)),
                                // eslint-disable-next-line no-undef
                                new google.maps.LatLng(parseFloat(stateBounds.northeast.lat !== undefined ? stateBounds.northeast.lat : mapPosition.lat + 0.025),
                                    parseFloat(stateBounds.northeast.lng !== undefined ? stateBounds.northeast.lng : mapPosition.lng + 0.025)),
                            ),
                            strictBounds: true,
                        },
                    }}
                >
                    <Marker
                        onLoad={markerLoad}
                        position={mapPosition}
                        onDragEnd={(event) => handleDragEnd(event)}
                        draggable
                    />
                </GoogleMap>
            </>
        );
    };

    // Return an error message if maps failed to load
    if (loadError) {
        return <div>{t('common:form:mapError')}</div>;
    }

    // Render the maps
    return isLoaded ? renderMap() : <div>{t('common:form:mapLoading')}</div>;
};

export default IcubeMapsAutocomplete;
