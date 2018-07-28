import * as React from 'react';
import { inject, observer } from 'mobx-react';
// import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group';
// import * as classnames from 'classnames';
// import { TRANSITION_DUARAION } from '../../../config/constants';
import { Gallery as Component } from './component';
import { Fitting } from '../Fitting/component';

@inject(({app, garments: { GalleryStore }, order}, nextProps: GalleryContainerProps) => {
    const {
        garment,
        group,
        subgroup,
    } = nextProps.match.params;
    return {
        setActiveOrderItem: order.setActiveItem,
        setPreviewElement: order.setPreviewElement,
        lang: app.lang,
        order,
        galleryStore: new GalleryStore(garment, subgroup, group),
        ...nextProps,
    };
})
@observer
class Gallery extends React.Component<GalleryContainerProps> {
    shouldComponentUpdate() {
        return false;
    }
    render() {
        const {
            galleryStore,
            lang,
            order,
            setActiveOrderItem,
            setPreviewElement,
            match: { params: { group } },
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
                        key={galleryStore.items.toString()}
                        order={order}
                        lang={lang}
                        setActiveOrderItem={setActiveOrderItem}
                        setPreviewElement={setPreviewElement}
                        items={galleryStore.items}
                        galleryStore={galleryStore}
                        group={group}
                    />
                )
        );
    }
}

export {
    Gallery,
};