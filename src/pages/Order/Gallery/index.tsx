import * as React from 'react';
import { Redirect } from 'react-router';
import { inject, observer } from 'mobx-react';
import { Gallery as Component } from './component';
import { routes } from '../routes';
import { Fitting } from '../Fitting/component';

@inject(({
    app,
    garments: { GalleryStore },
    order,
    order: { setActiveItem, setPreviewElement, exceptions, isExclusivePopupShowing },
    filterStore
}, nextProps: GalleryContainerProps) => {
    const {
        garment,
        group,
        subgroup,
    } = nextProps.match.params;
    return {
        setActiveOrderItem: setActiveItem,
        setPreviewElement: setPreviewElement,
        isExclusivePopupShowing,
        lang: app.lang,
        order,
        galleryStore: new GalleryStore(garment, group, subgroup, exceptions),
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
        const orderStore = this.props.order!;
        if (orderStore.isEmptyOrder()) {
            return <Redirect to={routes.details} />;
        }
        const {
            galleryStore,
            lang,
            order,
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
                        order={order}
                        lang={lang}
                        match={match}
                        setActiveOrderItem={setActiveOrderItem}
                        setPreviewElement={setPreviewElement}
                        items={galleryStore.items}
                        galleryStore={galleryStore}
                        group={group}
                        filterStore={filterStore}
                        activeElement={orderStore.activeElement}
                        previewElement={orderStore.previewElement}
                    />
                )
        );
    }
}

export {
    Gallery,
};