import * as React from 'react';
import { Redirect } from 'react-router';
import { inject, observer } from 'mobx-react';
import { Gallery as Component } from './component';
import { routes } from '../routes';
import { Fitting } from '../Fitting/component';
// import { Controll } from '../Filter';
import { InitialsCustomInput } from '../Initials-custom-input';
import ToggleBar from '../ToggleBar';

const galleryCache = {};

@inject(({
    app,
    garments: { GalleryStore, Subgroups },
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
        exceptions,
    } = order;

    const cacheName = [garment, group, subgroup].toString();
    if (!galleryCache[cacheName]) {
        galleryCache[cacheName] = new GalleryStore(garment, group, subgroup, exceptions);
    }

    return {
        app,
        setActiveOrderItem: setActiveItem,
        setPreviewElement,
        isExclusivePopupShowing,
        lang: app.lang,
        activeOrderItem: activeElement,
        orderStore: order,
        galleryStore: galleryCache[cacheName],
        filterStore: filterStore,
        Subgroups: Subgroups,
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
            match: { params: { group, subgroup } },
            filterStore,
            match
        } = this.props;

        if (group === 'design' && subgroup === 'initials_text') {
            return <div style={{ padding: '1.333rem 0 0 0', width: '100%' }}><InitialsCustomInput /></div>;
        }
        const items = [...galleryStore.items];

        return (
            group === 'fitting'
                ? (
                    <Fitting
                        key={galleryStore.items.toString()}
                        lang={lang}
                        items={items}
                        orderStore={orderStore}
                    />
                )
                : (
                    <> {/* Заглушка */}
                    {group === 'design' && (
                        <div className={'nav-overflow'}>
                            <div className={'design-navigation-wrapper'}>
                                <a href="/random" className={'design-navigation'}>Все1</a>
                                <a href="/random" className={'design-navigation _active'}>Воротник</a>
                                <a href="/random" className={'design-navigation'}>Манжет</a>
                                <a href="/random" className={'design-navigation'}>Перед</a>
                             </div>
                        </div>
                    )}
                    <div
                        style={
                            {
                                display: 'contents',
                                visibility: this.props.app && this.props.app.searchedItemsCount ?
                                    'visible' : 'hidden'
                            }
                        }
                    >
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
                            app={this.props.app}
                        />
                    </div>
                    </>
                )
        );
    }
}

@inject()
@observer
class Gallery extends React.Component<GalleryContainerProps> {
    render() {
        const {
            match: { params: { group, garment } },
        } = this.props;
        return (
            <>
                 {group === 'fabric_ref' && <ToggleBar garment={garment} />}
                <GalleryBlock {...this.props} />
            </>
        );
    }
}

export {
    Gallery,
};
