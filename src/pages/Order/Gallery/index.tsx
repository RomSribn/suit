import * as React from 'react';
import { Redirect } from 'react-router';
import { inject, observer } from 'mobx-react';
import { intersection } from 'lodash';
import { Gallery as Component } from './component';
import { routes } from '../routes';
import { Fitting } from '../Fitting/component';
import { Controll } from '../Filter';

const galleryCache = {};

@inject(({
    app,
    garments: { GalleryStore },
    order,
    filterStore,
}, nextProps: GalleryContainerProps) => {
    const {
        garment,
        group,
        subgroup,
    } = nextProps.match.params;
    const {
        setActiveItem,
        setPreviewElement,
        isExclusivePopupShowing,
        activeElement,
        exceptions
    } = order;

    const cacheName = [garment, group, subgroup].toString();
    if (!galleryCache[cacheName]) {
        galleryCache[cacheName] = new GalleryStore(garment, group, subgroup, exceptions);
    }

    return {
        setActiveOrderItem: setActiveItem,
        setPreviewElement,
        isExclusivePopupShowing,
        lang: app.lang,
        activeOrderItem: activeElement,
        orderStore: order,
        galleryStore: galleryCache[cacheName],
        filterStore: filterStore,
        ...nextProps,
    };
})
@observer
class GalleryBlock extends React.Component<GalleryContainerProps> {
    componentWillUnmount() {
        const filterStore = this.props.filterStore!;
        filterStore.closeFilter();
        filterStore.clearUserFilters();
        filterStore.clearFilters();

        if (!this.props.isExclusivePopupShowing()) {
            this.props.setActiveOrderItem(null);
        }
    }
    render() {
        const orderStore = this.props.orderStore!;
        if (orderStore.isEmptyOrder()) {
            return <Redirect to={routes.details} />;
        }
        const {
            galleryStore,
            lang,
            setActiveOrderItem,
            setPreviewElement,
            match: { params: { group } },
            filterStore,
            match
        } = this.props;
        
        const filters = filterStore.userFilters;
        
        const items = [...galleryStore.items].filter((galleryStoreItem: {}) => {
            const filtersKeys = Object.keys(filters);
            return filtersKeys.reduce((acc, filterName) => {
                const filterValues = filters[filterName];
                if (filterValues &&
                    filterValues.length
                ) {
                    if ( // И в хвост и в гриву
                        filterValues.includes(String(galleryStoreItem[filterName].value)) ||
                        filterValues.includes(String(galleryStoreItem[filterName])) ||
                        !(galleryStoreItem[filterName] instanceof Object) &&
                            filterValues.map(Number).includes(Number(galleryStoreItem[filterName])) ||
                        // Так как это объекты mobx'a обычная проверка Array.isArray ну не сработает.
                        // Используем костыль с проверкой на метод map
                        galleryStoreItem[filterName].map &&
                            intersection(
                                filterValues, galleryStoreItem[filterName].map((val: {value: string}) => val.value)
                            ).length
                    ) {
                        return true && acc;
                    }
                    
                    return false;
                }
                return acc;
            }, true);
        });

        return (
                group === 'fitting'
                ? (
                    <Fitting
                        key={galleryStore.items.toString()}
                        lang={lang}
                        items={items}
                    />
                )
                : (
                    <Component
                        key={(items || [])
                            .reduce((acc: string, item: GalleryStoreItem) => acc += item.our_code, 'key')}
                        lang={lang}
                        match={match}
                        setActiveOrderItem={setActiveOrderItem}
                        setPreviewElement={setPreviewElement}
                        items={items}
                        galleryStore={galleryStore}
                        group={group}
                        filterStore={filterStore}
                        orderStore={orderStore}
                        activeElement={orderStore.activeElement}
                        previewElement={orderStore.previewElement}
                        activeOrderItem={this.props.activeOrderItem}
                    />
                )
        );
    }
}

@inject()
@observer
class Gallery extends React.Component<GalleryContainerProps> {
    render() {
        const {
            match: { params: { group } },
        } = this.props;
        return (
            <>
                {group === 'fabric_ref' && <Controll />}
                <GalleryBlock {...this.props} />
            </>
        );
    }
}

export {
    Gallery,
};