import * as React from 'react';
import { Redirect } from 'react-router';
import { inject, observer } from 'mobx-react';
import { Gallery as Component } from './component';
import { routes } from '../routes';
import { Fitting } from '../Fitting/component';

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
class Gallery extends React.Component<GalleryContainerProps> {
    componentWillUnmount() {
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

        return (
                group === 'fitting'
                ? (
                    <Fitting
                        key={galleryStore.items.toString()}
                        lang={lang}
                        items={[...galleryStore.items]}
                    />
                )
                : (
                    <Component
                        key={(galleryStore.items || [])
                            .reduce((acc: string, item: GalleryStoreItem) => acc += item.our_code, 'key')}
                        lang={lang}
                        match={match}
                        setActiveOrderItem={setActiveOrderItem}
                        setPreviewElement={setPreviewElement}
                        items={galleryStore.items}
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

export {
    Gallery,
};